import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { Group_Hardware_List } from 'src/database/entities/hardware.entity';
import { Group_WashMachine_List } from 'src/database/entities/wash_machine.entity';
import { PaginationQueryString } from 'src/shared/dto/querry-string-pagination.dto';
import { getOffset } from 'src/shared/helper/utils';
import { PaginationResponseInterface } from 'src/shared/interface/pagination-response';
import { HardwareService } from './hardware.service';

@Controller('hardware')
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
