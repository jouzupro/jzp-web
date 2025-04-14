import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabBoxComponent } from './vocab-box.component';

describe('VocabBoxComponent', () => {
  let component: VocabBoxComponent;
  let fixture: ComponentFixture<VocabBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
