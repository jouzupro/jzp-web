import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiDetailPageComponent } from './kanji-detail-page.component';

describe('KanjiDetailPageComponent', () => {
  let component: KanjiDetailPageComponent;
  let fixture: ComponentFixture<KanjiDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanjiDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanjiDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
