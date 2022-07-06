import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TypesService} from "./types.service";
import {CreateTypeDto} from "./dto/create-type.dto";
import {UpdateTypeDto} from "./dto/update-type.dto";

@Controller('types')
export class TypesController {
    constructor(private readonly typesService: TypesService) {}

    @Post()
    create(@Body() createTypeDto: CreateTypeDto){
        return this.typesService.create(createTypeDto)
    }

    @Get()
    findAll(){
        return this.typesService.findAll()
    }

    @Patch()
    update(@Param('id') id: number, @Body() updateTypeDto: UpdateTypeDto){
        return this.typesService.update(id, updateTypeDto)
    }

    @Delete()
    delete(@Param('id') id: number){
        return this.typesService.delete(id)
    }


}
