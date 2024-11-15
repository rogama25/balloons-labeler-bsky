import {Column, DataType, Max, Min, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class User extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    handle!: string;

    @Min(1) @Max(31)
    @Column(DataType.INTEGER)
    day!: number;

    @Min(1) @Max(12)
    @Column(DataType.INTEGER)
    month!: number

    @Column(DataType.DATE)
    nextUpdate!: Date
}
