import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization) {
      try {
        const token = (authorization ?? '').split(' ')[1];
        const data = this.authService.checkToken(token);
        const user = await this.authService.getById(parseInt(data.sub));
        request.user = user;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    const { cpf, licensePlate } = request.body;
    if (cpf && licensePlate) {
      const isValid = await this.authService.validateCpfAndLicensePlate(
        cpf,
        licensePlate,
      );
      if (!isValid) {
        throw new UnauthorizedException('CPF or LicensePlate are invalid');
      }
      return true;
    }

    return false;
  }
}
