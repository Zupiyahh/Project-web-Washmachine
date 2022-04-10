import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ROLE_ENUM } from '../../../api/role/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'สมชาย' })
  @IsString()
  @IsNotEmpty()
  firtName: string;

  @ApiProperty({ example: 'นึกคิด' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'testemail@mail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => {
    return String(value).toLowerCase().trim();
  })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return String(value).trim();
  })
  password: string;

  @ApiProperty({ example: '0977568431' })
  @IsPhoneNumber('TH')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: ROLE_ENUM.Customer })
  @IsString()
  @Transform(({ value }) => {
    return String(value).trim();
  })
  @IsIn(Object.values(ROLE_ENUM))
  role: string;

  @ApiProperty({
    example: 'paymentName',
  })
  @IsString()
  paymentName: string;

  money: string;
  total: number;
}
