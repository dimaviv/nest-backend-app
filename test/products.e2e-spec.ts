import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProductsModule } from '../src/products/products.module';
import { ProductsService } from '../src/products/products.service';
import { INestApplication } from '@nestjs/common';

describe('Products (e2e)', () => {
    let app: INestApplication;
    let productsService = { findAll: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ProductsModule],
        })
            .overrideProvider(ProductsService)
            .useValue(productsService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET products`, () => {
        return request(app.getHttpServer())
            .get('/products')
            .expect(200)
            .expect({
                data: productsService.findAll(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});