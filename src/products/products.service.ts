import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Product} from "./products.model";
import {TypesService} from "../types/types.service";


@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product) private productRepository: typeof Product,
              private typesService: TypesService) {}


  async create(dto: CreateProductDto) {
    const product = await this.productRepository.create(dto)
    const types = await this.typesService.getListOfTypesById(dto.typeId)
    await product.$set('types', types)
    return product;
  }

  async findAll(page: number) {
    const limit = parseInt(process.env.PAGINATION);
    const offset = page * limit;
    const products = await this.productRepository.findAndCountAll({offset, limit})
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findByPk(id)
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findByPk(id)
    const updatedProduct = await product.update({...dto})
    if (dto.typeId){
      const types = await this.typesService.getListOfTypesById(dto.typeId)
      await updatedProduct.$set('types', types)
    }
    return updatedProduct;
  }

  async remove(id: number) {
    const product = await this.productRepository.destroy({where:{id}})
    return product;
  }
}
