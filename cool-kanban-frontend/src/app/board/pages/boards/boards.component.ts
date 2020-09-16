import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from '@shared/models/board';
import { Subscription } from 'rxjs';
import { BAppState } from '../../store/reducers/b.reducers';

import * as BoardsActions from '../../store/actions/boards.actions';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  boardsSub: Subscription;
  boards: Board[];
  loading: boolean = true;

  constructor(private store: Store<BAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(BoardsActions.GetBoards());

    this.boardsSub = this.store.select('b').subscribe((state) => {
      const boardsState = state.boards;
      console.log('state', boardsState);

      if (state) {
        this.loading = boardsState.loading;

        if (boardsState.loadSuccess) {
          this.boards = boardsState.boards;
        }

        if (boardsState.loadFailed) {
          this.boards = [];
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }
}
