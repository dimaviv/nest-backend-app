import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {Type} from "./types.model";



@Table({tableName: 'product_types', createdAt:false, updatedAt:false})
export class ProductTypes extends Model<ProductTypes>{

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    prodId:number;

    @ForeignKey(() => Type)
    @Column({type: DataType.INTEGER})
    typeId:number;

}