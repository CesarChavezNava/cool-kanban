import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Board } from '@shared/models/board';
import { List } from '@shared/models/list';
import { Subscription } from 'rxjs';
import { BAppState } from '../../store/reducers/b.reducers';

import * as BoardActions from '../../store/actions/board.actions';
import * as ListActions from '../../store/actions/list.actions';
import * as CardActions from '../../store/actions/card.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  paramsSubs: Subscription;
  boardSubs: Subscription;
  listSubs: Subscription;
  cardSubs: Subscription;
  id: string;
  board: Board;
  loading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
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

      if (state.success) {
        this.store.dispatch(BoardActions.ResetBoardState());
      }

      if (state.error) {
        this.openSnakBar(state.message, 'X', 'error-snackbar');
      }
    });

    this.listSubs = this.store.select('b', 'list').subscribe((state) => {
      if (state.success) {
        this.store.dispatch(ListActions.ResetListState());
        this.store.dispatch(BoardActions.GetBoard({ id: this.id }));
      }

      if (state.error) {
        this.openSnakBar(state.message, 'X', 'error-snackbar');
      }
    });

    this.cardSubs = this.store.select('b', 'card').subscribe((state) => {
      if (state.success) {
        this.store.dispatch(CardActions.ResetCardState());
      }

      if (state.error) {
        this.openSnakBar(state.message, 'X', 'error-snackbar');
      }
    });
  }

  addList(): void {
    const list: List = { idBoard: this.board.id, name: '' } as List;
    this.store.dispatch(ListActions.CreateList({ list }));
  }

  openSnakBar(message: string, action: string, clazz: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
