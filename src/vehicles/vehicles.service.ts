import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly repository: VehiclesRepository) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const { licensePlate } = createVehicleDto;
    const vehicle = await this.repository.findOneByLicensePlate(licensePlate);
    if (vehicle)
      throw new HttpException(
        'Vehicle with this license plate already exists',
        HttpStatus.CONFLICT,
      );
    return await this.repository.create(createVehicleDto);
  }

  async findOne(licensePlate: string) {
    const vehicle = await this.repository.findOneByLicensePlate(licensePlate);
    if (!vehicle)
      throw new HttpException(
        "Vehicle with this license plate don't exist",
        HttpStatus.NOT_FOUND,
      );
    return vehicle;
  }

  async findOneById(id: number) {
    const vehicle = await this.repository.findOneById(id);
    if (!vehicle)
      throw new HttpException(
        "Vehicle with this id don't exist",
        HttpStatus.NOT_FOUND,
      );
    return vehicle;
  }

  async searchByLicensePlate(licensePlate: string) {
    const vehicles = await this.repository.searchByLicensePlate(licensePlate);
    if (vehicles.length === 0) {
      throw new HttpException('No vehicles found', HttpStatus.NOT_FOUND);
    }
    return vehicles;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.repository.findOneById(id);
    if (!vehicle)
      throw new HttpException(
        "Vehicle with this id don't exist",
        HttpStatus.NOT_FOUND,
      );

    const { kilometersDriven, lastOilChange } = updateVehicleDto;
    if (!kilometersDriven && !lastOilChange)
      throw new HttpException(
        'You should set a new value for kilometersDriven or lastOilChange',
        HttpStatus.BAD_REQUEST,
      );

    return await this.repository.update(id, updateVehicleDto);
  }

  async remove(id: number) {
    await this.repository.findOneById(id);
    return await this.repository.remove(id);
  }
}
