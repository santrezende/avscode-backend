import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { Max, Min } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @Min(1)
  @Max(5)
  rating: number;
}
