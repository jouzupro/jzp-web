import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiBoxComponent } from './kanji-box.component';

describe('KanjiBoxComponent', () => {
  let component: KanjiBoxComponent;
  let fixture: ComponentFixture<KanjiBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanjiBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanjiBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
