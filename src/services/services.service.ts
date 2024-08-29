import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesRepository } from './services.repository';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Injectable()
export class ServicesService {
  constructor (
    private readonly repository: ServicesRepository, 
    private readonly vehiclesService: VehiclesService
  ) { }

  async create(createServiceDto: CreateServiceDto) {
    const { vehicleId } = createServiceDto;
    await this.vehiclesService.findOneById(vehicleId);
    return await this.repository.create(createServiceDto);
  }

  async findAllByLicensePlate(licensePlate: string) {
    await this.vehiclesService.findOne(licensePlate);
    return await this.repository.findAllByLicensePlate(licensePlate);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const { serviceData, rating } = updateServiceDto;
    if (!serviceData || !rating) throw new HttpException("You should set a new value for serviceData or rating", HttpStatus.NOT_ACCEPTABLE);
    return await this.repository.update(id, updateServiceDto);
  }

  async remove(id: number) {
    return await this.repository.remove(id);
  }
}
