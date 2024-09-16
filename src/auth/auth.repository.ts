import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) {}

  create(signUpDto: SignUpDto) {
    return this.prisma.users.create({
      data: {
        ...signUpDto,
        password: bcrypt.hashSync(signUpDto.password, this.SALT),
      },
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.users.findFirst({
      where: { email },
    });
  }

  getById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }
}
