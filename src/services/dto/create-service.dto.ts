import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator"

export class CreateServiceDto {
    @IsNotEmpty()
    serviceDate: Date;

    @IsString()
    @IsNotEmpty()
    serviceData: string;

    @IsNotEmpty()
    @IsNumber()
    vehicleId: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;
}
