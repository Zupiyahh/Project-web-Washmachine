import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/base/crud.service';
import { HardwareEntity } from 'src/database/entities/hardware.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HardwareService extends CrudService<HardwareEntity> {
  constructor(
    @InjectRepository(HardwareEntity)
    protected repository: Repository<HardwareEntity>,
  ) {
    super();
  }
}
