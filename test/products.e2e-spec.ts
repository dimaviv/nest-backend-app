import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {ProductsModule} from "../dist/products/products.module";
import * as request from "supertest";
import {getModelToken} from "@nestjs/sequelize";
import {Product} from "../dist/products/products.model";


describe('UserController (e2e)', () => {
    let app: INestApplication;

    const mockProductsRepository = {

    }

    beforeEach(async () => {
        const moduleFuxture: TestingModule = await Test.createTestingModule({
            imports: [ProductsModule],
        }).overrideProvider(getModelToken(Product))
            .useValue(mockProductsRepository)
            .compile()
        
        app = moduleFuxture.createNestApplication();
        await app.init();
    });

    it('/products (GET)', () => {
        return request(app.getHttpServer())
            .get('/products')
            .expect(200)

    });
})