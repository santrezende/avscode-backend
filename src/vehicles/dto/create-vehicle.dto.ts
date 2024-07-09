import { IsNotEmpty, IsString, IsInt, Length } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @Length(7, 7, { message: 'A placa do veículo deve ter 7 caracteres.' })
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @Length(11, 14, { message: 'O CPF/CNPJ do proprietário deve ter 11 ou 14 caracteres.' })
  @IsNotEmpty()
  cpfOrCnpj: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  engine: string;

  @IsInt()
  @IsNotEmpty()
  kilometersDriven: number;

  @IsNotEmpty()
  lastOilChange: Date;
}
