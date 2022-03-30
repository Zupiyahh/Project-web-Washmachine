import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../api/user/user.service';
import { UserEntity } from '../database/entities/user.entity';
import { Raw } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtPayloadInterface } from './jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(auth_login: AuthDto) {
    const user = await this.validateUser(auth_login);
    if (!user) {
      throw new UnauthorizedException('ไม่มีผู้ใช้งาน');
    }
    console.log('user is ', user);

    const payload: JwtPayloadInterface = {
      uuid: user.uuid,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      userInfo: user,
    };
  }

  async validateUser(auth_login: AuthDto): Promise<UserEntity | null> {
    const { email, password } = auth_login;
    const user = await this.userService.findOne({
      select: [
        'id',
        'uuid',
        'firtName',
        'lastName',
        'email',
        'password',
        'role',
      ],
      where: {
        email: Raw((alias) => `LOWER(${alias}) = LOWER('${email.trim()}')`),
      },
    });
    if (user) {
      if (compareSync(password, user.password)) {
        console.log('User Validation Success!!');
        return user;
      } else {
        console.log('Password not match');
        return null;
      }
    }
    console.log('User Validation failed!!');
    return null;
  }
}
