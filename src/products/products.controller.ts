import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "./products.model";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @ApiOperation({summary: 'Creating new product'})
    @ApiResponse({status:201, type: Product})
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @ApiOperation({summary: 'Getting all products (page, limit)'})
    @ApiResponse({status:200, type: [Product]})
    @Get()
    findAll(@Query('page') page: number,
            @Query('limit') limit: number,) {
        return this.productsService.findAll(page, limit);
    }

    @ApiOperation({summary: 'Getting one product by id'})
    @ApiResponse({status: 200, type: Product})
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @ApiOperation({summary: 'Updating product by id'})
    @ApiResponse({status:200, type: Product})
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @ApiOperation({summary: 'Removing product by id'})
    @ApiResponse({status:200})
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.productsService.remove(id);
    }
}
