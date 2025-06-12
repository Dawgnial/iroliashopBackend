import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Tokenservice } from './token/token.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Role } from 'src/common/enum/role';
import { Hash } from 'src/common/utility/hash';
import { DeepPartial } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: Tokenservice,
  ) {}

  async register(data: RegisterDto): Promise<{ accessToken: string }> {
    const { email, name, password } = data;

    const userExists: DeepPartial<User> =
      await this.userService.getUserByEmail(email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await Hash(password);
    const newUser = await this.userService.createUser({
      name: name || null,
      email,
      password: hashedPassword,
    } as CreateUserDto);

    const accessToken = await this.tokenService.createAccessToken({
      id: newUser.id,
      role: Role.USER,
    });

    return { accessToken };
  }

  async login(data: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = data;

    const user: DeepPartial<User> =
      await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.tokenService.createAccessToken({
      id: user.id,
      role: Role.USER,
    });

    return { accessToken };
  }
}
