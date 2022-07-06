import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ProductTypes} from "../types/product-types.model";
import {Type} from "../types/types.model";
import {Product} from "./products.model";


@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product, Type, ProductTypes]),
  ]
})
export class ProductsModule {}
