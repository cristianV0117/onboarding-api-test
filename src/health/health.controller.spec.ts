import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('health', () => {
    it('should return { ok: true }', () => {
      const result = controller.health();
      expect(result).toEqual({ ok: true });
    });

    it('should have ok property as boolean', () => {
      const result = controller.health();
      expect(result).toHaveProperty('ok');
      expect(typeof result.ok).toBe('boolean');
    });

    it('should always return ok as true', () => {
      const result = controller.health();
      expect(result.ok).toBe(true);
    });
  });
});
