import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {ProductTypes} from "./product-types.model";
import {ApiProperty} from "@nestjs/swagger";


interface TypeCreationAttrs {
    name: string;
    parentId: number;
}

@Table({tableName: 'types'})
export class Type extends Model<Type, TypeCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Fruits', description: 'Name of the type'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '2', description: 'Parent type (if not = null)'})
    @ForeignKey(() => Type)
    @Column({type: DataType.INTEGER, allowNull: true})
    parentId: number;

    @BelongsToMany(() => Product, () => ProductTypes)
    products: Product[]

    @BelongsTo(() => Type)
    parent: Type;

    @HasMany(() => Type)
    types: Type[];

}