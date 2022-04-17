import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { Group_Hardware_List } from '../../database/entities/hardware.entity';
import { PaginationQueryString } from '../../shared/dto/querry-string-pagination.dto';
import { getOffset } from '../../shared/helper/utils';
import { PaginationResponseInterface } from '../../shared/interface/pagination-response';
import { HardwareService } from './hardware.service';

@Controller('hardware')
@ApiTags('hardware')
export class HardwareController {
    constructor(private readonly hardwareService: HardwareService) {}
    
  @Get('hardware')
  @ApiOkResponse({
    description: 'The response list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async listhardware(@Query() query: PaginationQueryString) {
    const { page, limit } = query;
    const [harwares, total] = await this.hardwareService.findAndCount({
      take: limit,
      skip: getOffset(page, limit),
    });
    const response: PaginationResponseInterface = {
      items: classToPlain(harwares, {
        groups: [Group_Hardware_List],
        strategy: 'excludeAll',
      }),
      total: total,
      page: page,
      limit: limit,
    };
    return response;
  }
}
