import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { WeatherController } from './controllers/weather.controller';
import { WeatherService } from './services/weather.service';
import { GeocodeService } from 'src/geocode/services/geocode.service';


@Module({
  imports: [ConfigModule.forRoot(),
    HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, GeocodeService]
})
export class WeatherModule {}