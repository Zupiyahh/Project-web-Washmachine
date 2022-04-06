import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authLogin: AuthDto) {
    return await this.authservice.login(authLogin);
  }
}
