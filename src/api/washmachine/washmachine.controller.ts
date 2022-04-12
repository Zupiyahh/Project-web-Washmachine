import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtPayloadInterface } from '../../auth/jwt.interface';
import { CreateWashMachineDto } from './dto/created-washmachine.dto';
import { WashmachineService } from './washmachine.service';
import { JwtPayloadData } from '../../shared/decorator/user.decorator';
import { ROLE_ENUM } from '../role/role.enum';
import { JwtAuthGuard } from '../../auth/guard/jwt-guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { Roles } from '../../shared/decorator/roles.decorator';
import { PaginationQueryString } from '../../shared/dto/querry-string-pagination.dto';
import { getOffset } from '../../shared/helper/utils';
import { PaginationResponseInterface } from '../../shared/interface/pagination-response';
import { classToPlain } from 'class-transformer';
import { Group_WashMachine_List } from '../../database/entities/wash_machine.entity';
import { UpadateWashMachineDto } from './dto/updated-washmachine.dto';

@Controller('washmachine')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('WashMachine')
export class WashmachineController {
  constructor(private readonly washmachineService: WashmachineService) {}

  @Post()
  @Roles(ROLE_ENUM.Owner)
  @UseInterceptors(FileInterceptor(''))
  @ApiCreatedResponse({
    description: 'The response list has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  async CreateWashMachine(
    @JwtPayloadData() jwtData: JwtPayloadInterface,
    @Body() createWashMachine: CreateWashMachineDto,
  ) {
    const washmodes = await this.washmachineService.CreateWashMode({
      role: jwtData.role,
    });
    const washmachines = await this.washmachineService.CreateWashMachine({
      Machine_Model: createWashMachine.Machine_Model,   
      WashID: createWashMachine.WashID,
      Price: createWashMachine.Price,
      locationName: createWashMachine.locationName,
      locationID: createWashMachine.locationID,
      WashModes: washmodes,
      role: jwtData.role,
      uuid: jwtData.uuid,
    });

    return washmachines;
  } 
  @Get('washmode')
  @ApiOkResponse({
    description: 'The washmode data has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getWashMode(@JwtPayloadData() jwtData: JwtPayloadInterface) {
    const obj = this.washmachineService.readJsonFile();
    const jsonobj = obj[jwtData.role];
    console.log(jsonobj);
    
    return obj;
  }

  @Get()
  @ApiOkResponse({
    description: 'The response list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async listWashMachine(@Query() query: PaginationQueryString) {
    const { page, limit } = query;
    const [washmachines, total] = await this.washmachineService.findAndCount({
      take: limit,
      skip: getOffset(page, limit),
    });
    const response: PaginationResponseInterface = {
      items: classToPlain(washmachines, {
        groups: [Group_WashMachine_List],
        strategy: 'excludeAll',
      }),
      total: total,
      page: page,
      limit: limit,
    };
    return response;
  }

  @Patch(':id')
  @Roles(ROLE_ENUM.Owner)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(''))
  @ApiOkResponse({
    description: 'The response list has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async updateWashMachineData(
    @Param('id') id: string,
    @Body() washMachineData: UpadateWashMachineDto,
  ) {
    await this.washmachineService.updateWashMachineData(+id, washMachineData);
    return { success: true };
  }

  @Delete(':id')
  @Roles(ROLE_ENUM.Owner)
  @ApiOkResponse({
    description: 'The response has been successfully removed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async DeleteWashMachine(@Param('id') id: number) {
    if (!(await this.washmachineService.findOneWashMachine(id)))
      throw new NotFoundException('Not Found WashMachine');
    const washmachine = await this.washmachineService.delete(id);
    return washmachine;
  }

  @Get('washID/:id')
  @ApiOkResponse({
    description: 'The washmachine By ID data has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async getWashMachineByID(@Param('id', ParseIntPipe) id: number) {
    const washmachine = await this.washmachineService.findOne({
      relations: ['WashModes'],
      where: {
        id: id,
      },
    });
    if (!washmachine) {
      throw new NotFoundException('Not Found WashMachine');
    }
    return washmachine;
  }

 
}
