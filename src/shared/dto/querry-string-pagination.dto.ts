import {
    IsString,
    IsOptional,
    IsIn,
    IsUppercase,
    IsBoolean,
    Max,
    Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum OrderBy {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class PaginationQueryString {
    @ApiProperty({ required: false })
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => {
        return Number(value);
    })
    page?: number = 1;

    @ApiProperty({ required: false })
    @IsOptional()
    @Max(50)
    @Min(1)
    @Transform(({ value }) => {
        return Number(value);
    })
    limit?: number = 50;

    @ApiProperty({ enum: [OrderBy.DESC, OrderBy.ASC], required: false })
    @IsString()
    @IsOptional()
    @IsUppercase()
    @IsIn([OrderBy.ASC, OrderBy.DESC])
    orderBy?: OrderBy = OrderBy.DESC;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        return String(value).toLocaleLowerCase() == 'true';
    })
    pagination = true;
}