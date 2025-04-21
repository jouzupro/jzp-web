import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  IBaseKanji,
  IBaseRadical,
  IBaseVocabulary,
} from '../../constant/types';
import dummy from '../../../assets/json/dummies.json';
import { KanjiDetailComponent } from './kanji-detail/kanji-detail.component';
import { RadicalDetailComponent } from './radical-detail/radical-detail.component';
import { VocabDetailComponent } from './vocab-detail/vocab-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-kanji-detail-page',
  imports: [
    MatIconModule,
    CommonModule,
    KanjiDetailComponent,
    RadicalDetailComponent,
    VocabDetailComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './kanji-detail-page.component.html',
  styleUrl: './kanji-detail-page.component.css',
})
export class KanjiDetailPageComponent implements OnInit {
  id = '';

  base: any | undefined;
  kanji: IBaseKanji | undefined;
  radical: IBaseRadical | undefined;
  vocabulary: IBaseVocabulary | undefined;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.getDetail = this.getDetail.bind(this);
  }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.kanji = undefined;
      this.radical = undefined;
      this.vocabulary = undefined;

      this.id = params['id'];
      console.log(this.id);
      this.base = dummy[0].materials;
      if (this.id === '亅') {
        this.radical = this.base.radical[0];
      } else if (this.id === '争') {
        this.kanji = this.base.kanji[0];
      } else if (this.id === '競争') {
        this.vocabulary = this.base.vocabulary[0];
      }
      this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top
    });
  }

  getDetail(res: any) {
    console.log('triggered');
    this.router.navigate(['kanji-detail'], {
      queryParams: { id: res }
    });
  }
}
