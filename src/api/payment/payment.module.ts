import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from 'src/database/entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
  imports: [PaymentModule, TypeOrmModule.forFeature([PaymentEntity, UserEntity])],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
