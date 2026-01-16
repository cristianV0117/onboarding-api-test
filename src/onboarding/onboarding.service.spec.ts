import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
  let service: OnboardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnboardingService],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an onboarding with REQUESTED status', () => {
      const dto = {
        name: 'Juan Perez',
        document: '123456789',
        email: 'juan@mail.com',
        initialAmount: 100000,
      };

      const result = service.create(dto);

      expect(result).toHaveProperty('onboardingId');
      expect(result).toHaveProperty('status');
      expect(result.status).toBe('REQUESTED');
    });

    it('should generate a valid UUID for onboardingId', () => {
      const dto = {
        name: 'Juan Perez',
        document: '123456789',
        email: 'juan@mail.com',
        initialAmount: 100000,
      };

      const result = service.create(dto);
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      expect(result.onboardingId).toMatch(uuidRegex);
    });

    it('should generate unique IDs for different onboardings', () => {
      const dto = {
        name: 'Juan Perez',
        document: '123456789',
        email: 'juan@mail.com',
        initialAmount: 100000,
      };

      const result1 = service.create(dto);
      const result2 = service.create(dto);

      expect(result1.onboardingId).not.toBe(result2.onboardingId);
    });
  });
});
