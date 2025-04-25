import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto.user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepo.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepo.save(user);
      delete (user as any).password;

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'roles', 'nameGroup'],
    });

    if (!user)
      throw new BadRequestException('Email no es correcto');

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Contraseña no es correcta');

    const { password: _, ...userWithoutPassword } = user;

    return {
      token: this.getJwtToken({
        id: user.id,
        email: user.email,
        nameGroup: user.nameGroup,
        roles: user.roles,
      }),
      user: userWithoutPassword,
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}