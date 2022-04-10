import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
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
import { classToPlain } from 'class-transformer';
import { userInfo } from 'os';
import { stderr } from 'process';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { JwtPayloadInterface } from 'src/auth/jwt.interface';
import {
  Group_Payment_List,
  Group_Payment_View,
} from 'src/database/entities/payment.entity';
import { Group_User_List } from 'src/database/entities/user.entity';
import { JwtPayloadData } from 'src/shared/decorator/user.decorator';
import { PaginationQueryString } from 'src/shared/dto/querry-string-pagination.dto';
import { getOffset } from 'src/shared/helper/utils';
import { PaginationResponseInterface } from 'src/shared/interface/pagination-response';import { PaymentService } from './payment.service';
@Controller('payment')
@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor(''))
  // @ApiCreatedResponse({
  //   description: 'The response list has been successfully created.',
  // })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @HttpCode(HttpStatus.CREATED)
  // @ApiConsumes('multipart/form-data')
  // async createPayment(
  //   @Body() createPayment: CreatePaymentDto,
  // ) {
  //   const _payment = await this.paymentService.createPayment(createPayment);
  //   return _payment;
  // }

  @Get()
  @ApiOkResponse({
    description: 'The response list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findUsers(@Query() query: PaginationQueryString) {
    const { page, limit } = query;
    const [payments, total] = await this.paymentService.findAndCount({
      take: limit,
      skip: getOffset(page, limit),
    });
    const response: PaginationResponseInterface = {
      items: classToPlain(payments, {
        groups: [Group_Payment_List],
        strategy: 'excludeAll',
      }),
      total: total,
      page: page,
      limit: limit,
    };
    return response;
  }

  @Get(':id')
  @SerializeOptions({ groups: [Group_Payment_View] })
  @ApiOkResponse({
    description: 'The response list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @SerializeOptions({ groups: [Group_Payment_View] })
  async findPayment(@Param('id') id: number) {
    const _Payment = await this.paymentService.findOnePaymentByuserId(id);
    if (!_Payment) {
      throw new NotFoundException('Not Found Data');
    }
    return _Payment;
  }

  // @Patch(':id')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor(''))
  // @ApiOkResponse({
  //   description: 'The response list has been successfully updated.',
  // })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })
  // async updatePaymentData(
  //   @Param('id') id: string,
  //   @Body() PaymentData: UpdatePaymentDto,
  // ) {
  //   if (!(await this.paymentService.findOnePaymentByuserId(+id)))
  //     throw new NotFoundException('Not Found Payment');
  //   await this.paymentService.updatePaymentData(+id, PaymentData);
  //   return { success: true };
  // }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The response has been successfully removed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async DeletePayment(@Param('id') id: number) {
    if (!(await this.paymentService.findOnePaymentByuserId(id)))
      throw new NotFoundException('Not Found Payment');
    const payment = await this.paymentService.delete(id);
    return payment;
  }
}
