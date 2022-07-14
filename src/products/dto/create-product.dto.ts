export class CreateProductDto {
    readonly name: string;
    readonly typeId: number;
    readonly priceRetail: number;
    readonly priceTrade: number;
    readonly quantity: number;
    readonly price: number;
}
