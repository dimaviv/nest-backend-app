import { Test, TestingModule } from "@nestjs/testing";
import { Product } from "./products.model";
import { getModelToken } from "@nestjs/sequelize";
import { ProductsService } from "./products.service";
import { TypesService } from "../types/types.service";

describe("UserService", () => {
  let service: ProductsService;
  const mockProductsRepository = {
    create: jest.fn().mockImplementation((dto) =>
      Promise.resolve({
        id: Date.now(),
        ...dto,
        types: [{ id: 1 }, { id: 2 }, { id: 3 }],
        $set: jest.fn(() => Promise.resolve()),
      })
    ),
    findByPk: jest.fn().mockImplementation(() => ({
      id: 1,
      name: "New product",
      typeId: 3,
      priceRetail: 35,
      priceTrade: 24,
      quantity: 90,
      price: 20,
      $set: jest.fn(() => Promise.resolve()),
      update: jest.fn(() => ({
        id: 1,
        name: "New product",
        typeId: 3,
        priceRetail: 35,
        priceTrade: 24,
        quantity: 90,
        price: 20,
        types: [{ id: 4 }, { id: 5 }],
        $set: jest.fn(() => Promise.resolve()),
      })),
    })),
    findOne: jest.fn().mockImplementation(),
  };
  const mockTypesService = {
    getIdListOfParents: jest
      .fn()
      .mockImplementation(() => Promise.resolve([1, 2, 3])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product),
          useValue: mockProductsRepository,
        },
        TypesService,
      ],
    })
      .overrideProvider(TypesService)
      .useValue(mockTypesService)
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should create a new product, attach types and return it", async () => {
    expect(
      await service.create({
        name: "New product",
        typeId: 4,
        priceRetail: 35,
        priceTrade: 24,
        quantity: 100,
        price: 20,
      })
    ).toEqual({
      $set: expect.anything(),
      id: expect.any(Number),
      name: "New product",
      typeId: 4,
      priceRetail: 35,
      priceTrade: 24,
      quantity: 100,
      price: 20,
      types: expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ id: 2 }),
        expect.objectContaining({ id: 3 }),
      ]),
    });
  });
  it("should update the product, attach updated types and return it", async () => {
    expect(
      await service.update(1, {
        name: "New product",
        typeId: 3,
        priceRetail: 35,
        priceTrade: 24,
        quantity: 90,
        price: 20,
      })
    ).toEqual({
      $set: expect.anything(),
      id: 1,
      name: "New product",
      typeId: 3,
      priceRetail: 35,
      priceTrade: 24,
      quantity: 90,
      price: 20,
      types: expect.arrayContaining([
        expect.objectContaining({ id: 4 }),
        expect.objectContaining({ id: 5 }),
      ]),
    });
  });
});
