import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';

describe('OnboardingController', () => {
  let controller: OnboardingController;
  let service: OnboardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [OnboardingService],
    }).compile();

    controller = module.get<OnboardingController>(OnboardingController);
    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an onboarding and return onboardingId and status', () => {
      const dto = {
        name: 'Juan Perez',
        document: '123456789',
        email: 'juan@mail.com',
        initialAmount: 100000,
      };

      const result = controller.create(dto);

      expect(result).toHaveProperty('onboardingId');
      expect(result).toHaveProperty('status');
      expect(result.status).toBe('REQUESTED');
      expect(typeof result.onboardingId).toBe('string');
    });

    it('should generate unique onboarding IDs', () => {
      const dto = {
        name: 'Juan Perez',
        document: '123456789',
        email: 'juan@mail.com',
        initialAmount: 100000,
      };

      const result1 = controller.create(dto);
      const result2 = controller.create(dto);

      expect(result1.onboardingId).not.toBe(result2.onboardingId);
    });
  });
});
