import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaymentEntity } from '../../database/entities/payment.entity';
import { Connection, DeepPartial, IsNull, Raw, Repository, UpdateResult } from 'typeorm';import { CrudService } from '../../base/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class PaymentService extends CrudService<PaymentEntity> {

  constructor(
    private connection: Connection,
    @InjectRepository(PaymentEntity)
    protected repository: Repository<PaymentEntity>,
    @InjectRepository(UserEntity)
    private readonly  userRepository: Repository<UserEntity>,
    ) {
    super();
  }

  // async addPayment(
  //   createPaymentDto: DeepPartial<CreatePaymentDto>,
  // ): Promise<PaymentEntity> {
  //   const { dueDate } = createPaymentDto;
  //   const alreadyPayment = await this.findOneBytotal(dueDate)
  //   if (alreadyPayment ) {
  //     throw new BadRequestException('Already exis payment .');
  //   }
  //   if (createPaymentDto.money)
  //     createPaymentDto.total =
  //       parseInt(createPaymentDto.money)

  //   return await this.repository.save({ ...createPaymentDto });
  // }

  async findOnePaymentByuserId(userId: number): Promise<PaymentEntity> {
    const _payment = await this.repository.findOne({
      where: {
        user: userId,
      },
    });
    return _payment;
  }

  async delete(id: number) {
    const payment = await this.findOnePaymentByuserId(id);
    payment.deletedAt = new Date();
    await payment.save();
  }

  // async updatePaymentData(
  //   id: number,
  //   paymentData: CreatePaymentDto,
  // ): Promise<UpdateResult> {
  //   return await this.repository.update(id, paymentData);
  // }

 

}
