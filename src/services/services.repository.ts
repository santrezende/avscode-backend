import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Injectable()
export class ServicesRepository {
    constructor(private readonly prisma: PrismaService) { }

    create(createServiceDto: CreateServiceDto) {
        return this.prisma.services.create({
            data: {
                serviceDate: createServiceDto.serviceDate,
                serviceTitle: createServiceDto.serviceTitle,
                serviceData: createServiceDto.serviceData,
                vehicleId: createServiceDto.vehicleId,
                kilometersDriven: createServiceDto.kilometersDriven,
                rating: 0
            }
        })
    }

    findAllByLicensePlate(licensePlate: string) {
        return this.prisma.services.findMany({
            where: {
                vehicle: {
                    licensePlate,
                }
            }, 
            orderBy: {
                id: 'desc',
            }
        })
    }

    update(id: number, updateServiceDto: UpdateServiceDto) {
        return this.prisma.services.update({
            where: { id },
            data: updateServiceDto
        })
    }

    remove(id: number) {
        return this.prisma.services.delete({
            where: { id }
        })
    }
}