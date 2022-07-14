import * as request from "supertest";
import {CreateProductDto} from "../dist/products/dto/create-product.dto";


describe('ProductsController (e2e)', () => {
    const productsUrl = `http://localhost:5000/products/`

    const mockProduct: CreateProductDto = {
        name: 'New product',
        typeId: 3,
        priceRetail: 35,
        priceTrade: 24,
        quantity: 90,
        price: 20,
    }


    it('/products (GET)', () => {
        return request(productsUrl)
            .get('/products')
            .expect(200)

    });
})