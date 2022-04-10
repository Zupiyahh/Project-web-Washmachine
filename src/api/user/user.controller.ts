import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import {
  Group_User_List,
  Group_User_View,
  UserEntity,
} from '../../database/entities/user.entity';
import { getOffset } from '../../shared/helper/utils';
import { PaginationResponseInterface } from '../../shared/interface/pagination-response';
import { ROLE_ENUM } from '../role/role.enum';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/created-user.dto';
import { PaginationQueryString } from '../../shared/dto/querry-string-pagination.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guard/jwt-guard';
import { UpadateUserDto } from './dto/updated-user.dto';
import { UpdatePaymentDto } from './dto/updated-payment.dto.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor(''))
  @ApiCreatedResponse({
    description: 'The response list has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  async createUser(@Body() createUser: CreateUserDto) {
    if (
      createUser.role !== ROLE_ENUM.Customer &&
      createUser.role !== ROLE_ENUM.Owner
    ) {
      throw new BadRequestException('Cannot CreateUser');
    }
    return await this.userService.createUser(createUser);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'The response list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findUsers(@Query() query: PaginationQueryString) {
    const { page, limit } = query;
    const [users, total] = await this.userService.findAndCount({
      take: limit,
      skip: getOffset(page, limit),
    });
    const response: PaginationResponseInterface = {
      items: classToPlain(users, {
        groups: [Group_User_List],
        strategy: 'excludeAll',
      }),
      total: total,
      page: page,
      limit: limit,
    };
    return response;
  }
  
  @Get(':uuid')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SerializeOptions({ groups: [Group_User_View] })
  @ApiOkResponse({
    description: 'The response list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @SerializeOptions({ groups: [Group_User_View] })
  async findUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const user = await this.userService.findOneByUUID(uuid);
    if (!user) {
      throw new NotFoundException('Not Found Data');
    }
    return user;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(''))
  @ApiOkResponse({
    description: 'The response list has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async updateData(@Param('id') id: string, @Body() userData: UpadateUserDto) {
    await this.userService.updateUserData(+id, userData);
    return { success: true };
  }

  @Patch('addpayment/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(''))
  @ApiOkResponse({
    description: 'The response list has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async addPaymentData(@Param('id') id: string, @Body() addPayment: UpdatePaymentDto) {
    await this.userService.addPayment(+id, addPayment);
    return { success: true };
  }

  // @Patch('payment/:id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor(''))
  // @ApiOkResponse({
  //   description: 'The response list has been successfully updated.',
  // })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })
  // async paymentData(@Param('id') id: string, @Body() payment: UpdatePaymentDto) {
  //   await this.userService.payment(+id);
  //   return { success: true };
  // }

  @Post(':payment/submit')
  async submitPay(
    @Param('id') id: number,
  ) {
    await this.userService.payment(id);
    console.log(id);
    
  }
}
