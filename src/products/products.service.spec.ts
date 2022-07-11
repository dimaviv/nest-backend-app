import * as request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { INestApplication } from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";
import {UsersService} from "../users/users.service";

describe('UserService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ProductsModule],
        })
            .compile()
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

});