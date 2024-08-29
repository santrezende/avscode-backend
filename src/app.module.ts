import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, VehiclesModule, ServicesModule, AuthModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '15h' },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
