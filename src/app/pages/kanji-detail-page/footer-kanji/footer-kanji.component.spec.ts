import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterKanjiComponent } from './footer-kanji.component';

describe('FooterKanjiComponent', () => {
  let component: FooterKanjiComponent;
  let fixture: ComponentFixture<FooterKanjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterKanjiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterKanjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
