import { Injectable } from '@nestjs/common';
import {CreateTypeDto} from "./dto/create-type.dto";
import {UpdateTypeDto} from "./dto/update-type.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Type} from "./types.model";

@Injectable()
export class TypesService {
    constructor(@InjectModel(Type) private typeRepository: typeof Type) {}

    async create(dto: CreateTypeDto) {
        const type = await this.typeRepository.create(dto)
        return type
    }

    async findAll() {
        const types = await this.typeRepository.findAll()
        return types;
    }

    async update(id: number, dto: UpdateTypeDto) {
        const type = await this.typeRepository.findByPk(id)
        const updatedType = await type.update({...dto})
        return updatedType;
    }

    async delete(id: number) {
        const type = await this.typeRepository.destroy({where:{id}})
        return type
    }
}
