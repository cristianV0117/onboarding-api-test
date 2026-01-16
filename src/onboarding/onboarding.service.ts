import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateOnboardingDto } from './dtos/create-onboarding.dto';

interface Onboarding {
  id: string;
  data: CreateOnboardingDto;
  status: 'REQUESTED';
}

@Injectable()
export class OnboardingService {
  private onboardings: Onboarding[] = [];

  create(data: CreateOnboardingDto) {
    const onboarding: Onboarding = {
      id: uuidv4(),
      data,
      status: 'REQUESTED',
    };

    this.onboardings.push(onboarding);

    return {
      onboardingId: onboarding.id,
      status: onboarding.status,
    };
  }
}
