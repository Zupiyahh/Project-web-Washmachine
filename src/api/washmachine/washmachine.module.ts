import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { WashMachineEntity } from '../../database/entities/wash_machine.entity';
import { WashModeEntity } from '../../database/entities/wash_mode.entity';
import { UserService } from '../user/user.service';
import { WashmachineController } from './washmachine.controller';
import { WashmachineService } from './washmachine.service';

@Module({
  imports: [TypeOrmModule.forFeature([WashMachineEntity, UserEntity, WashModeEntity])],
  controllers: [WashmachineController],
  providers: [WashmachineService, UserService],
})
export class WashmachineModule {}
