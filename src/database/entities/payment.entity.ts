import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { DATABASE_TABLE } from '../enum/database-table.enum';
import { ExtendedEntity } from '../extended-entity';
import { UserEntity } from './user.entity';

export const Group_Payment_List = 'group_payment_list';
export const Group_Payment_View = 'group_payment_view';

@Entity(DATABASE_TABLE.Payment)
export class PaymentEntity extends ExtendedEntity {
  @Column({  nullable: true })
  @Expose({
    groups: [Group_Payment_List, Group_Payment_View],
  })
  money: string;

  @Column({  nullable: true })
  @Expose({
    groups: [Group_Payment_List, Group_Payment_View],
  })
  dueDate: string;

  @Column({  nullable: true })
  @Expose({
    groups: [Group_Payment_List, Group_Payment_View],
  })
  total: number;

  @Column({  nullable: true })
  @Expose({
    groups: [Group_Payment_List, Group_Payment_View],
  })
  paymentName: string;

}
