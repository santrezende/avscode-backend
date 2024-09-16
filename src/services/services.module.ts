import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesRepository } from './services.repository';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { VehiclesRepository } from 'src/vehicles/vehicles.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthRepository } from 'src/auth/auth.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    ServicesRepository,
    VehiclesService,
    VehiclesRepository,
    AuthService,
    AuthRepository,
  ],
})
export class ServicesModule {}
