import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiPagesComponent } from './kanji-pages.component';

describe('KanjiPagesComponent', () => {
  let component: KanjiPagesComponent;
  let fixture: ComponentFixture<KanjiPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanjiPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanjiPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
