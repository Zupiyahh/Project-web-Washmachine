import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdatePaymentDto {

  @ApiProperty({
    example: '30'
  })
  @IsString()
  money: string;

  total: number;

  ModeName: string;
}
