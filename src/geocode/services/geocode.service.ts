import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom, catchError } from "rxjs";
import { AxiosError } from "axios";
import { GeocodeResponseData } from "../dtos/geocode.response.data";

@Injectable()
export class GeocodeService {
  constructor(
    private readonly httpService: HttpService, 
    private readonly configService: ConfigService,
  ) { }

  async getGeocode(cityName: any): Promise<GeocodeResponseData> {
    const apiKey = this.configService.get('API_KEY');

    try {
      const requestConfig = {
        headers: {
          'X-Api-Key': 'x7x1/ROfdQInbFu1j60j7g==qDJQLrZgbMHe5Azr',
          'Content-Type': 'application/json',
        },
      };

      const apiURL = this.configService.get('API_NINJAS_V1');

      const { data } = await firstValueFrom(
        this.httpService.get<GeocodeResponseData[]>(
          `${apiURL}/geocoding?city=${cityName}`,
          requestConfig,
        ).pipe(
          catchError((error: AxiosError) => {
            console.error('Error fetching geocode:', error.response?.data);
            throw new InternalServerErrorException(error.response?.data);
          }),
        ),
      );

      if (Array.isArray(data)) {
        return data.length > 0 ? data[0] : null;
      }

      return data as GeocodeResponseData;
    } catch (err) {
      throw new InternalServerErrorException({
        descriptionOrOptions: err,
      });
    }
  }
}