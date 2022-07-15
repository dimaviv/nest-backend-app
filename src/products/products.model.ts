import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ProductTypes} from "../types/product-types.model";
import {Type} from "../types/types.model";

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

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    typeId: number;

    @Column({type: DataType.DECIMAL, allowNull: false})
    priceRetail: number;

    @Column({type: DataType.DECIMAL, allowNull: false})
    priceTrade: number;

    @Column({type: DataType.BOOLEAN, allowNull: true, defaultValue: true})
    available: boolean;

    @Column({type: DataType.INTEGER, allowNull: false})
    quantity: number;

    @Column({type: DataType.DECIMAL, allowNull: false})
    price: number;

    @BelongsToMany(() => Type, () => ProductTypes)
    types: Type[];
}