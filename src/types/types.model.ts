import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {ProductTypes} from "./product-types.model";


interface TypeCreationAttrs{
    name: string;
    parentId: number;
}

@Table({tableName: 'types'})
export class Type extends Model<Type, TypeCreationAttrs>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id: number;

    @Column({type: DataType.STRING, allowNull:false})
    name: string;

    @ForeignKey(() => Type)
    @Column({type: DataType.INTEGER, allowNull:true})
    parentId: number;

    @BelongsToMany(() => Product, () => ProductTypes)
    products: Product[]

    @BelongsTo(() => Type)
    parent: Type;

    @HasMany(() => Type)
    types: Type[];

}