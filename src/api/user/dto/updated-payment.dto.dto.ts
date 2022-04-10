import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdatePaymentDto {

  @ApiProperty({
    example: '300'
  })
  @IsString()
  money: string;

  total: number;
}
