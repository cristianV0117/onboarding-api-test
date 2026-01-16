import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(3);
    });

    it('should return products with correct structure', () => {
      const result = service.findAll();
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('price');
    });
  });

  describe('findOne', () => {
    it('should return a product by id', () => {
      const result = service.findOne(1);
      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
      expect(result?.name).toBe('Savings Account');
    });

    it('should return undefined for non-existent product', () => {
      const result = service.findOne(999);
      expect(result).toBeUndefined();
    });
  });
});
