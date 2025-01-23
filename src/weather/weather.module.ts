import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { GeocodeService } from 'src/geocode/geocode.service';


@Module({
  imports: [ConfigModule.forRoot(),
    HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, GeocodeService]
})
export class WeatherModule {}