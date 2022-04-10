import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HardwareEntity } from 'src/database/entities/hardware.entity';
import { HardwareController } from './hardware.controller';
import { HardwareService } from './hardware.service';

@Module({
  imports: [TypeOrmModule.forFeature([HardwareEntity])],
  controllers: [HardwareController],
  providers: [HardwareService],
})
export class HardwareModule {}
