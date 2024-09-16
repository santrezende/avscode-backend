import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createVehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: createVehicleDto,
    });
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return this.prisma.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  findOneByLicensePlate(licensePlate: string) {
    return this.prisma.vehicle.findUnique({
      where: { licensePlate },
    });
  }

  findOneById(id: number) {
    return this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
