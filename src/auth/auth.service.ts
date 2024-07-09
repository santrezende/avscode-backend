import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { Users } from '@prisma/client';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '15 hours';
  private ISSUER = 'AVS Motors';
  private AUDIENCE = 'employees';

  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository
  ) {}

  async getById(id: number) {
    const user = await this.repository.getById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async getUserByEmail(email: string) {
    return await this.repository.getUserByEmail(email);
  }

  async create(signUpDto: SignUpDto) {
    const { email } = signUpDto;
    const user = await this.repository.getUserByEmail(email);
    if (user) throw new HttpException('Email already in use', HttpStatus.CONFLICT);

    return await this.repository.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.getUserByEmail(email);
    if (!user) throw new HttpException('Email or password not valid', HttpStatus.UNAUTHORIZED);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new HttpException('Email or password not valid', HttpStatus.UNAUTHORIZED);

    return this.createToken(user);
  }

  createToken(user: Users) {
    const { id, email } = user;

    const token = this.jwtService.sign(
      { email },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: this.AUDIENCE,
      issuer: this.ISSUER,
    });

    return data;
  }
}