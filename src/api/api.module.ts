import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { WashmachineModule } from './washmachine/washmachine.module';
import { PaymentModule } from './payment/payment.module';
import { HardwareModule } from './hardware/hardware.module';

@Module({
  imports: [UserModule, RoleModule, WashmachineModule, PaymentModule, HardwareModule],
})
export class ApiModule {}
