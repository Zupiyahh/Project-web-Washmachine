import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DATABASE_TABLE } from '../enum/database-table.enum';
import { ExtendedEntity } from '../extended-entity';

export const Group_Hardware_List = 'Group_Hardware_List';

@Entity(DATABASE_TABLE.Hardware)
export class HardwareEntity extends ExtendedEntity{

  @Column({ type: 'varchar', length: 255 })
  @Expose({ groups: [Group_Hardware_List] })
  WID: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose(({ groups: [Group_Hardware_List] }))
  Model: string;

  @Column({ type: 'varchar', length: 255 })
  @Expose(({ groups: [Group_Hardware_List] }))
  Location_ID: string;

  @Column({ type: 'int' })
  @Expose(({ groups: [Group_Hardware_List] }))
  WTime: number;

  @Column({ type: 'varchar', length: 255 })
  @Expose(({ groups: [Group_Hardware_List] }))
  State: string;

}
