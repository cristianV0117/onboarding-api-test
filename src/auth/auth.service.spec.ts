import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access token with valid credentials', () => {
      const result = service.login('admin', 'password123');

      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('mock-jwt-token');
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 1,
        username: 'admin',
      });
    });

    it('should throw UnauthorizedException with invalid username', () => {
      expect(() => service.login('invalid', 'password123')).toThrow(
        UnauthorizedException,
      );
      expect(() => service.login('invalid', 'password123')).toThrow(
        'Invalid credentials',
      );
    });

    it('should throw UnauthorizedException with invalid password', () => {
      expect(() => service.login('admin', 'invalid')).toThrow(
        UnauthorizedException,
      );
      expect(() => service.login('admin', 'invalid')).toThrow(
        'Invalid credentials',
      );
    });

    it('should throw UnauthorizedException with both invalid credentials', () => {
      expect(() => service.login('wrong', 'wrong')).toThrow(
        UnauthorizedException,
      );
    });
  });
});
