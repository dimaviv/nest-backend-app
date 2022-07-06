export class CreateProductDto {
    readonly name: string;
    readonly typeId: number;
    readonly priceTrade: number;
    readonly available: boolean;
    readonly quantity: number;
    readonly price: number;
}
