import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnemonicWrapperComponent } from './mnemonic-wrapper.component';

describe('MnemonicWrapperComponent', () => {
  let component: MnemonicWrapperComponent;
  let fixture: ComponentFixture<MnemonicWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MnemonicWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnemonicWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
