import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ProductTypes} from "../types/product-types.model";
import {Type} from "../types/types.model";
import {ApiProperty} from "@nestjs/swagger";

interface ProductCreationAttrs {
    name: string;
    typeId: number;
    priceRetail: number;
    priceTrade: number;
    available: boolean;
    quantity: number;
    //rename to supply price
    price: number;
}

@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreationAttrs> {

    @ApiProperty({example:'1', description: 'Unique ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'Golden Apple', description: 'Name of the product'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example:'3', description: ''})
    @Column({type: DataType.INTEGER, allowNull: false})
    typeId: number;

    @ApiProperty({example:'35', description: ''})
    @Column({type: DataType.DECIMAL, allowNull: false})
    priceRetail: number;

    @ApiProperty({example:'30', description: ''})
    @Column({type: DataType.DECIMAL, allowNull: false})
    priceTrade: number;

    @ApiProperty({example:'true', description: ''})
    @Column({type: DataType.BOOLEAN, allowNull: true, defaultValue: true})
    available: boolean;

    @ApiProperty({example:'100', description: ''})
    @Column({type: DataType.INTEGER, allowNull: false})
    quantity: number;

    @ApiProperty({example:'25', description: ''})
    @Column({type: DataType.DECIMAL, allowNull: false})
    price: number;

    @BelongsToMany(() => Type, () => ProductTypes)
    types: Type[];
}