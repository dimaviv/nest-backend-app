import { Module } from '@nestjs/common';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Type} from "./types.model";
import {Product} from "../products/products.model";
import {ProductTypes} from "./product-types.model";



@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [
    SequelizeModule.forFeature([Type, Product, ProductTypes]),
  ],
  exports:[
    TypesService,
  ]
})

export class TypesModule {}
