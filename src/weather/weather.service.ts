import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { WeatherResponseData } from "./weather.response.data";
import { GeocodeService } from "src/geocode/geocode.service";

@Injectable()
export class WeatherService {

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly geocodeService: GeocodeService
  ) { }

  async getCity(cityName: any): Promise<WeatherResponseData> {
    const apiKey = this.configService.get('API_KEY');
    const geocodeResponse = await this.geocodeService.getGeocode(cityName);
    
    if (geocodeResponse != null) {
      try {
        let requestConfig = {
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'
          }
        };
        const { data } = await firstValueFrom(
          this.httpService.get<WeatherResponseData>(`https://api.api-ninjas.com/v1/weather?lat=${geocodeResponse.latitude}&lon=${geocodeResponse.longitude}`, requestConfig)
            .pipe(catchError((error: AxiosError) => {
              console.log(error.response.data);
              throw error.response.data;
            }))
        );

        const mergedResponse = Object.assign({}, geocodeResponse, data);

        return mergedResponse;
      } catch (err) {
        console.log('erro: ', err);
        throw new InternalServerErrorException({
          descriptionOrOptions: err,
        });
      }
    } else {
      throw new NotFoundException('City not found');
    }
  }

  async getCities(cities: any): Promise<Array<WeatherResponseData>> {
    let weatherResponse: Array<WeatherResponseData> = [];

    try {
      const promises = cities.map(async city => {
        try {
          return await this.getCity(city);
        } catch (err) {
          console.error(`Error during search of city ${city}:`, err);
          return null;
        }
      });

      const results = await Promise.allSettled(promises);
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          weatherResponse.push(result.value);
        }
      });

      return weatherResponse;
    } catch (err) {
      console.log('erro: ', err);
      throw new InternalServerErrorException({
        descriptionOrOptions: err,
      });
    }
  }

  async getAverageTemperature(cityName: any): Promise<string> {
    let response = await this.getCity(cityName);
    return `${(response.max_temp + response.min_temp) / 2}ºC`;
  }
}