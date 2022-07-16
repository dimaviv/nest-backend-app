import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {TypesService} from "./types.service";
import {CreateTypeDto} from "./dto/create-type.dto";
import {UpdateTypeDto} from "./dto/update-type.dto";
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "../products/products.model";
import {Type} from "./types.model";

@ApiTags('Types')
@Controller('types')
export class TypesController {
    constructor(private readonly typesService: TypesService) {
    }

    @ApiOperation({summary: 'Creating new type'})
    @ApiResponse({status: 201, type: Type})
    @Post()
    create(@Body() createTypeDto: CreateTypeDto) {
        return this.typesService.create(createTypeDto)
    }

    @ApiOperation({summary: 'Getting all types with it\'s children'})
    @ApiResponse({status: 200, type: [Type]})
    @Get()
    findAll() {
        return this.typesService.findAll()
    }

    @ApiOperation({summary: 'Updating type by id'})
    @ApiResponse({status: 200, type: Type})
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateTypeDto: UpdateTypeDto) {
        return this.typesService.update(id, updateTypeDto)
    }

    @ApiOperation({summary: 'Deleting type by id'})
    @ApiResponse({status: 200})
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.typesService.delete(id)
    }
}
