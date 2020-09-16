import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board } from '@shared/models/board';
import { Subscription } from 'rxjs';
import { BAppState } from '../../store/reducers/b.reducers';

import * as BoardActions from '../../store/actions/board.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  paramsSubs: Subscription;
  boardSubs: Subscription;
  id: string;
  board: Board;
  loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<BAppState>
  ) {}

  ngOnInit(): void {
    this.paramsSubs = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;

      if (this.id) {
        this.store.dispatch(BoardActions.GetBoard({ id: this.id }));
      }
    });

    this.boardSubs = this.store.select('b', 'board').subscribe((state) => {
      this.loading = state.loading;

      if (state.loadSuccess) {
        this.board = state.board;
      }
    });
  }

  addList(): void {}
}
