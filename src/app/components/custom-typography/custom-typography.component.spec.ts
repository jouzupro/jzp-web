import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTypographyComponent } from './custom-typography.component';

describe('CustomTypographyComponent', () => {
  let component: CustomTypographyComponent;
  let fixture: ComponentFixture<CustomTypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTypographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
