import {
  All,
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { RefreshTokenDto } from './modules/auth/dto/refresh-token.dto';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { RegisterDto } from './modules/auth/dto/register.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('auth/refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.validateRefreshToken(refreshTokenDto);
  }

  @UseGuards(JwtAuthGuard)
  @All('auth/authenticate')
  async profile(@Request() req, @Response() res) {
    res.header('user', JSON.stringify(req.user));
    return res.send(req.user);
  }
}
