import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const result = controller.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(3);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('price');
    });
  });

  describe('findOne', () => {
    it('should return a product when found', () => {
      const result = controller.findOne('1');
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBe('Savings Account');
    });

    it('should throw NotFoundException when product not found', () => {
      expect(() => controller.findOne('999')).toThrow(NotFoundException);
      expect(() => controller.findOne('999')).toThrow('Product not found');
    });
  });
});
