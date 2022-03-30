import { Expose } from "class-transformer";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { DATABASE_TABLE } from "../enum/database-table.enum";
import { ExtendedEntity } from "../extended-entity";
import { UserEntity } from "./user.entity";
import { WashModeEntity } from "./wash_mode.entity";

export const Group_WashMachine_List = 'Group_WashMachine_List';
export const Group_WashMachine_View = 'Group_WashMachine_View';

@Entity(DATABASE_TABLE.WashMachine)
export class WashMachineEntity extends ExtendedEntity {
    
    @Column({ type: 'varchar', length: 100, nullable: false })
    @Expose({ groups: [Group_WashMachine_List, Group_WashMachine_View] })
    Machine_Model: string;
    
    @Column({ type: 'varchar', length: 100, nullable: false  })
    @Expose({ groups: [Group_WashMachine_List, Group_WashMachine_View] })
    locationName: string;

    @Column({ type: 'varchar', length: 100, nullable: false  })
    @Expose({ groups: [Group_WashMachine_List, Group_WashMachine_View] })
    locationID: string;

    @Column({ type: 'varchar', length: 100, nullable: false  })
    @Expose({ groups: [Group_WashMachine_List, Group_WashMachine_View] })
    WashID: string;

    @Column({ nullable: false  })
    @Expose({ groups: [Group_WashMachine_List, Group_WashMachine_View] })
    Price: string;

    @OneToMany(() => WashModeEntity, WashMode => WashMode.Wash)
    WashModes: WashModeEntity[];

    @Column({ type: 'varchar', length: 50, nullable: false })
    role: string;

    @ManyToOne(() => UserEntity, user => user.id, { nullable: true })
    user: number;

    @Expose({ groups: [Group_WashMachine_List], name: "id" })
    getId() {
        return this.id
    }
}