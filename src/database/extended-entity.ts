import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ExtendedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @CreateDateColumn({  default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt: Date;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
