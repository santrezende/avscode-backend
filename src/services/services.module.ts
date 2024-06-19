import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesRepository } from './services.repository';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { VehiclesRepository } from 'src/vehicles/vehicles.repository';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository, VehiclesService, VehiclesRepository],
})
export class ServicesModule {}
