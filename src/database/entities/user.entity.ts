import { Expose } from 'class-transformer';
import { Column, Entity, Generated, ManyToOne } from 'typeorm';
import { DATABASE_TABLE } from '../enum/database-table.enum';
import { ExtendedEntity } from '../extended-entity';
import { Group_Payment_List } from './payment.entity';

export const Group_User_List = 'group_user_list';
export const Group_User_View = 'group_user_view';

@Entity(DATABASE_TABLE.User)
export class UserEntity extends ExtendedEntity {
  @Column({ unique: true, nullable: false })
  @Generated('uuid')
  @Expose({ groups: [Group_User_List] })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [Group_User_List, Group_User_View] })
  firtName: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [Group_User_List, Group_User_View] })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [Group_User_List, Group_User_View] })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [Group_User_List, Group_User_View] })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [Group_User_List, Group_User_View] })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [Group_User_List, Group_User_View] })
  role: string;

  @Column({ nullable: true })
  @Expose({
    groups: [ Group_User_List ],
  })
  money: string;

  @Column({ nullable: true })
  @Expose({
    groups: [ Group_User_List ],
  })
  total: number;

  @Column({ nullable: true })
  @Expose({
    groups: [ Group_User_List ],
  })
  paymentName: string;
}
