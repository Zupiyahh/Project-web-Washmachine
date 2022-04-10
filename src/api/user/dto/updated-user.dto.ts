import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsPhoneNumber } from "class-validator";
export class UpadateUserDto {
   
    @ApiProperty({ example: 'สมชาย' })
    @IsString()
    @IsNotEmpty()
    firtName: string;

    @ApiProperty({ example: 'นึกคิด' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: '0977568431'})
    @IsPhoneNumber('TH')
    @IsNotEmpty()
    phone: string;
}

