import { IsString, Length } from 'class-validator';

export class VerifyVehicleDto {
  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsString()
  @Length(7, 7)
  licensePlate: string;
}