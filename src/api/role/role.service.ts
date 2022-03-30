import { Injectable } from '@nestjs/common';
import { ROLE_ENUM } from './role.enum';

@Injectable()
export class RoleService {
  async findAll() {
    const roles = [
      {
        label: 'ผู้ใช้งานเครื่องซักผ้า',
        value: ROLE_ENUM.Customer,
      },
      {
        label: 'เจ้าของเครื่องซักผ้า',
        value: ROLE_ENUM.Owner,
      },
    ];
    return roles;
  }
}