import { Injectable, Controller, Inject, Post, HttpCode, Body, Get, Param } from "@nestjs/common";
import { WeatherResponseData } from "./weather.response.data";
import { WeatherService } from "./weather.service";

@Injectable()
@Controller('weather')
export class WeatherController {
  constructor(
    @Inject(WeatherService)
    private readonly service: WeatherService) {}

  @Get('/city/:cityName')
  @HttpCode(200)
  async getCity(@Param('cityName') cityName: string): Promise<WeatherResponseData> {
    console.log('Incoming request getCity: ', cityName);
    return await this.service.getCity(cityName);
  }

  @Post('/cities')
  @HttpCode(200)
  async getCities(@Body() cities: string): Promise<Array<WeatherResponseData>>{
    console.log('Incoming request getCities: ', cities);
    return await this.service.getCities(cities);
  }

  @Get('/average/:cityName')
  @HttpCode(200)
  async getAverageTemperature(@Param('cityName') cityName: string): Promise<String> {
    console.log('Incoming request getAverageTemperature: ', cityName);
    return await this.service.getAverageTemperature(cityName);
  }
}