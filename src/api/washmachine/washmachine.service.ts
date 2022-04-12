import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CrudService } from '../../base/crud.service';
import { UserEntity } from '../../database/entities/user.entity';
import { WashMachineEntity } from '../../database/entities/wash_machine.entity';
import { WashModeEntity } from '../../database/entities/wash_mode.entity';
import { Connection, IsNull, Repository, UpdateResult } from 'typeorm';
import { UpadateWashMachineDto } from './dto/updated-washmachine.dto';

@Injectable()
export class WashmachineService extends CrudService<WashMachineEntity> {
  constructor(
    private connection: Connection,
    @InjectRepository(WashMachineEntity)
    protected repository: Repository<WashMachineEntity>,
    @InjectRepository(WashModeEntity)
    private readonly WashModeRepository: Repository<WashModeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super();
  }

  readJsonFile(): { version: number } {
    const path = join(__dirname, '..', '..', '..', 'washmode.json');
    const jsonString = readFileSync(path, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    return jsonObj;
  }

  async CreateWashMode({ role }: { role: string }) {
    const washmodeJson = this.readJsonFile();
    const washmodeByrole = washmodeJson[role];
    console.log(washmodeJson);
    if (!washmodeByrole) {
      throw new BadRequestException('ไม่สามารถสร้างโหมดซักผ้าได้');
    }
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const washmode = await this.WashModeRepository.find({
        where: {
          role: role,
          Wash: IsNull(),
        },
      });
      console.log(washmode.length);
      if (washmode.length > 0) {
        return washmode;
      } else {
        for (const [Index, modeName] of washmodeByrole.entries()) {
          await queryRunner.manager
            .create(WashModeEntity, {
              ModeName: modeName.ModeName,
              Index: Index,
              role: role,
            })
            .save();
        }
      }
      const _washmode = await this.WashModeRepository.find({
        where: {
          role: role,
          Wash: IsNull(),
        },
      });
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return _washmode;
    } catch (error) {
      console.log('Error!! ', error);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new InternalServerErrorException('CreateWashMode Error');
    }
  }

  async CreateWashMachine({
    Machine_Model,
    locationName,
    locationID,
    WashID,
    Price,
    WashModes,
    role,
    uuid,
  }: {
    Machine_Model: string;
    locationName: string;
    locationID: string;
    WashID: string;
    Price: string;
    WashModes: WashModeEntity[];
    role: string;
    uuid: string;
  }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const _user = await this.userRepository.findOne({
        where: {
          uuid: uuid,
        },
      });
      if (!_user) {
        throw new NotFoundException();
      }
      const user = _user.id;
      
      await queryRunner.manager
        .create(WashMachineEntity, {
          Machine_Model,
          locationName,
          locationID,
          WashID,
          Price,
          WashModes,
          role,
          user,
        })
        .save();
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new InternalServerErrorException('CreateWasMachine Error');
    }
  }
  

  async updateWashMachineData(
    id: number,
    washMachineData: UpadateWashMachineDto,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, washMachineData);
  }

  async findOneWashMachine(id: number): Promise<WashMachineEntity> {
    return await this.repository.findOne({
      relations: ['user', 'WashModes'],
      where: {
        id: id,
      },
    });
  }

  async delete(id: number) {
    const findWashMachine = await this.findOneWashMachine(id);
    findWashMachine.deletedAt = new Date();
    await findWashMachine.save();
  }
}
