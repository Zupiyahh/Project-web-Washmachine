import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../base/crud.service';
import { UserEntity } from '../../database/entities/user.entity';
import {
  Connection,
  DeepPartial,
  FindManyOptions,
  IsNull,
  Raw,
  Repository,
  UpdateResult,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { UpadateUserDto } from './dto/updated-user.dto';
import { UpdatePaymentDto } from './dto/updated-payment.dto.dto';

export enum PayEnum {
  Pay = '0',
}

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    private connection: Connection,
    @InjectRepository(UserEntity)
    protected repository: Repository<UserEntity>,
  ) {
    super();
  }

  async createUser(data: DeepPartial<UserEntity>): Promise<UserEntity> {
    const { password, email } = data;
    const alreadyEmail = await this.findOneByEmail(email);
    if (alreadyEmail) {
      throw new BadRequestException('Already exis email.');
    }
    const entity: UserEntity = this.repository.create({
      ...data,
      password: hashSync(password, 10),
    });
    return entity.save();
  }

  async findOneByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email: Raw((alias) => `LOWER(${alias}) = LOWER('${email.trim()}')`),
      },
    });
  }

  async findOneByUUID(uuid: string) {
    return await this.repository.findOne({
      where: {
        uuid: uuid,
      },
    });
  }

  async findAll(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    const entities = await this.repository.find(options);
    return entities;
  }

  async updateUserData(
    id: number,
    userData: UpadateUserDto,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, userData);
  }

  async addPayment(
    id: number,
    addPayment: DeepPartial<UpdatePaymentDto>,
  ): Promise<UpdateResult> {
    if (addPayment.money !== '30') {
      throw new BadRequestException();
    }
    if (addPayment.money) {
      addPayment.total = parseInt(addPayment.money);
    }

    return await this.repository.update(id, addPayment);
  }
}
