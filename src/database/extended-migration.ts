import { TableColumnOptions } from "typeorm";

export const extendedMigration: TableColumnOptions[] = [
    {
        name: 'id',
        type: 'int8',
        isPrimary: true,
        isGenerated: true,
    },
    {
        name: 'createdAt',
        type: 'timestamptz',
        default: 'CURRENT_TIMESTAMP',
    },
    {
        name: 'updatedAt',
        type: 'timestamptz',
        default: 'CURRENT_TIMESTAMP',
    },
    {
        name: 'deletedAt',
        type: 'timestamptz',
        isNullable: true,
    },
];