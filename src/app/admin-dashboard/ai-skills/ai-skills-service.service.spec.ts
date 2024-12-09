import { TestBed } from '@angular/core/testing';

import { AiSkillsServiceService } from './ai-skills-service.service';

describe('AiSkillsServiceService', () => {
  let service: AiSkillsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiSkillsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
