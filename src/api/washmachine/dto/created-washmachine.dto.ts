import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWashMachineDto {
    @ApiProperty({ example: 'WD-14180FDS' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => {
        return String(value).trim()
    })
    Machine_Model: string;

    @ApiProperty({ example: 'หอพักลักษณานิเวศ1' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => {
        return String(value).trim()
    })
    locationName: string;

    @ApiProperty({ example: 'L01' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => {
        return String(value).trim()
    })
    locationID: string;

    @ApiProperty({ example: 'L01-001' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => {
        return String(value).trim()
    })
    WashID: string;

    @ApiProperty({ example: '20' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => {
        return String(value).trim()
    })
    Price: string;
}