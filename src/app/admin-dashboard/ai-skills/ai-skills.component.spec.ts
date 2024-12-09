import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSkillsComponent } from './ai-skills.component';

describe('AiSkillsComponent', () => {
  let component: AiSkillsComponent;
  let fixture: ComponentFixture<AiSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
