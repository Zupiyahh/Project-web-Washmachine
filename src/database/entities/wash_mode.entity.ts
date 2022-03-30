import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DATABASE_TABLE } from '../enum/database-table.enum';
import { ExtendedEntity } from '../extended-entity';
import { WashMachineEntity } from './wash_machine.entity';

@Entity(DATABASE_TABLE.WashMode)
export class WashModeEntity extends ExtendedEntity {

  @Column({ type: 'varchar', length: 255, nullable: false })
  ModeName: string;

  @ManyToOne(() => WashMachineEntity, Wash => Wash.id)
  Wash: WashMachineEntity;

  @Column({ type: 'varchar', length: 50, nullable: false })
  role: string;

  @Column({ type: 'int' })
  Index: number;


}
