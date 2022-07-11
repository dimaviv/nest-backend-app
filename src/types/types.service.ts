import { Injectable } from '@nestjs/common';
import {CreateTypeDto} from "./dto/create-type.dto";
import {UpdateTypeDto} from "./dto/update-type.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Type} from "./types.model";
import {map} from "rxjs";

@Injectable()
export class TypesService {
    constructor(@InjectModel(Type) private typeRepository: typeof Type) {}

    async create(dto: CreateTypeDto) {
        const type = await this.typeRepository.create(dto)
        return type
    }

    async findAll() {
        const types = await this.typeRepository.findAll({include: [
                { model: Type, as: 'types' }
            ]})
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

    async getIdListOfParents(id: number){
        const types_model = await this.typeRepository.findByPk(id, {
            attributes:['id'],
            include: [
                { model: Type, as: 'parent', attributes:['id'],
                include:[
                    {
                        model: Type, as: 'parent', attributes:['id'],
                        include:[
                            {
                                model: Type, as: 'parent', attributes:['id'],
                                include:[
                                    {
                                        model: Type, as: 'parent', attributes:['id'],
                                        include:[
                                            {
                                                model: Type, as: 'parent', attributes:['id'],
                                            }]
                                    }]
                            }]
                    }]
                    }]}
        );

        let types =  JSON.parse(JSON.stringify(types_model, null, 2))

        const parents_ids = []
        const iterate = (obj) => {
            Object.keys(obj).forEach(key => {
                if (key === 'id'){parents_ids.push(obj[key])}
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    iterate(obj[key])
                }
            })
        }
        iterate(types)
        return parents_ids
    }
}
