import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {TypesService} from "../types/types.service";
import {Type} from "../types/types.model";


@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product) private productRepository: typeof Product,
                private typesService: TypesService) {
    }


    async create(dto: CreateProductDto) {
        const product = await this.productRepository.create(dto)
        const types_ids = await this.typesService.getIdListOfParents(dto.typeId)
        await product.$set('types', types_ids)
        return product;
    }

    async findAll(page: number, limit: number) {
        const offset = (page - 1) * limit;
        const products = await this.productRepository.findAndCountAll({offset, limit})
        return products;
    }

    async findOne(id: number) {
        const product = await this.productRepository.findByPk(id, {include: {model: Type, as: 'types'}})
        return product;
    }

    async update(id: number, dto: UpdateProductDto) {
        const product = await this.productRepository.findByPk(id)
        const updatedProduct = await product.update(dto, {where: {id}})
        if (dto.typeId) {
            const types_ids = await this.typesService.getIdListOfParents(dto.typeId)
            await updatedProduct.$set('types', types_ids)
        }
        return updatedProduct;
    }

    async remove(id: number) {
        const product = await this.productRepository.destroy({where: {id}})
        return product;
    }
}
