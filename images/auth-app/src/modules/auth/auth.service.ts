import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../helpers/hash';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  accessKey: string;
  refreshKey: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessKey = this.configService.get<string>('accessToken');
    this.refreshKey = this.configService.get<string>('refreshToken');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && Hash.compare(password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, name: user.name };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.accessKey,
        expiresIn: '55m',
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.refreshKey,
        expiresIn: '510m',
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    let user = await this.usersService.findByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('Email already used');
    }

    const args: CreateUserDto = { ...registerDto, activated: false };

    user = await this.usersService.create(args);
    if (!user) {
      throw new InternalServerErrorException();
    }

    return user;
  }

  async validateRefreshToken(refreshTokenDto: RefreshTokenDto) {
    const { token } = refreshTokenDto;

    try {
      const user = this.jwtService.verify(token, { secret: this.refreshKey });

      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Token invalid');
    }
  }
}
