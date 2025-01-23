import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class AppService {
  getHello(): Record<string, any> {
    return {
      message: `Welcome to the Jhonatan's Weather API!`,
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'local',
      uptime: process.uptime(),
      platform: os.platform(),
    }
  };
}
