import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSettingComponent } from './practice-setting.component';

describe('PracticeSettingComponent', () => {
  let component: PracticeSettingComponent;
  let fixture: ComponentFixture<PracticeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
