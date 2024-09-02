import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateServiceDto {
    @IsNotEmpty()
    serviceDate: Date;

    @IsString()
    @IsNotEmpty()
    serviceData: string;

    @IsNotEmpty()
    @IsString()
    serviceTitle: string;

    @IsNotEmpty()
    @IsNumber()
    vehicleId: number;

    @IsNotEmpty()
    @IsNumber()
    kilometersDriven: number;
}
