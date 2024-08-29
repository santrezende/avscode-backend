import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { VehiclesRepository } from 'src/vehicles/vehicles.repository';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, VehiclesRepository],
})
export class AuthModule {}
