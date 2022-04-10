// import { Expose } from 'class-transformer';
// import { Column, Entity, OneToMany } from 'typeorm';
// import { DATABASE_TABLE } from '../enum/database-table.enum';
// import { ExtendedEntity } from '../extended-entity';
// import { WashMachineEntity } from './wash_machine.entity';


// export const Group_LocationWashmachine_List = 'Group_LocationWashmachine_List';

// @Entity(DATABASE_TABLE.LocationWashachine)
// export class LocationWashmachineEntity extends ExtendedEntity {
  
//   @Column({ type: 'varchar', length: 100, nullable: false })
//   @Expose({ groups: [Group_LocationWashmachine_List] })
//   locationName: string;

//   @Column({ type: 'varchar', length: 100, nullable: false })
//   @Expose({ groups: [Group_LocationWashmachine_List] })
//   locationID: string;

//   @OneToMany(() => WashMachineEntity, WashMachines => WashMachines.LocationWash)
//   WashMachines: WashMachineEntity[];

//   @Expose({ groups: [Group_LocationWashmachine_List], name: "id" })
//   getId() {
//       return this.id
//   }
// }
