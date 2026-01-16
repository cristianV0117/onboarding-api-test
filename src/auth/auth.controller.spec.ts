import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mock-jwt-token'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token with valid credentials', () => {
      const loginDto = {
        username: 'admin',
        password: 'password123',
      };

      const result = controller.login(loginDto);

      expect(result).toHaveProperty('access_token');
      expect(typeof result.access_token).toBe('string');
    });

    it('should throw UnauthorizedException with invalid credentials', () => {
      const loginDto = {
        username: 'invalid',
        password: 'invalid',
      };

      expect(() => controller.login(loginDto)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with invalid username', () => {
      const loginDto = {
        username: 'wrong',
        password: 'password123',
      };

      expect(() => controller.login(loginDto)).toThrow(UnauthorizedException);
      expect(() => controller.login(loginDto)).toThrow('Invalid credentials');
    });

    it('should throw UnauthorizedException with invalid password', () => {
      const loginDto = {
        username: 'admin',
        password: 'wrong',
      };

      expect(() => controller.login(loginDto)).toThrow(UnauthorizedException);
      expect(() => controller.login(loginDto)).toThrow('Invalid credentials');
    });
  });
});
