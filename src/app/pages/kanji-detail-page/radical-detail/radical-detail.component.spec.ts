import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicalDetailComponent } from './radical-detail.component';

describe('RadicalDetailComponent', () => {
  let component: RadicalDetailComponent;
  let fixture: ComponentFixture<RadicalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadicalDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadicalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
