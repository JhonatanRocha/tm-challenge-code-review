import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './services/app.service';
import { WeatherModule } from 'src/weather/weather.module';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
