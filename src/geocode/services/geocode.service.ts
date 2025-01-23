import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, catchError } from "rxjs";
import { AxiosError } from "axios";
import { GeocodeResponseData } from "../dtos/geocode.response.data";

@Injectable()
export class GeocodeService {
  constructor(private readonly httpService: HttpService) {}

  async getGeocode(cityName: any): Promise<GeocodeResponseData> {
    try {
      const rc = {
        headers: {
          'X-Api-Key': 'x7x1/ROfdQInbFu1j60j7g==qDJQLrZgbMHe5Azr',
          'Content-Type': 'application/json',
        },
      };

      const { data } = await firstValueFrom(
        this.httpService.get<GeocodeResponseData[]>(
          `https://api.api-ninjas.com/v1/geocoding?city=${cityName}`,
          rc,
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