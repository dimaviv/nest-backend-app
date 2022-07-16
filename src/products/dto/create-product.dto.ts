import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateProductDto {

    @ApiProperty({example:'Golden Apple', description:'Name of the product'})
    @IsString({message: "Must be a string"})
    readonly name: string;

    @ApiProperty({example: 3, description:'Id of type'})
    @IsNumber({},{message:"Must be a number"})
    readonly typeId: number;

    @ApiProperty({example: 35, description:'Retail price'})
    @IsNumber({},{message:"Must be a number"})
    readonly priceRetail: number;

    @ApiProperty({example: 30, description:'Wholesale price'})
    @IsNumber({},{message:"Must be a number"})
    readonly priceTrade: number;

    @ApiProperty({example: 10, description:'Quantity of items (or kg)'})
    @IsNumber({},{message:"Must be a number"})
    readonly quantity: number;

    @ApiProperty({example: 25, description:'Supplying price'})
    @IsNumber({},{message:"Must be a number"})
    readonly price: number;
}
