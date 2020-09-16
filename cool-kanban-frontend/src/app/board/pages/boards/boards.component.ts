import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Board } from '@shared/models/board';
import { Subscription } from 'rxjs';
import { BAppState } from '../../store/reducers/b.reducers';
import { BoardDialogComponent } from '../../components/board-dialog/board-dialog.component';

import * as BoardsActions from '../../store/actions/boards.actions';
import * as BoardActions from '../../store/actions/board.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {
  boardsSub: Subscription;
  boardSub: Subscription;

  boards: Board[];
  board: Board;
  loading: boolean = false;

  currentState: string = 'BoardsState';

  constructor(
    private store: Store<BAppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BoardsActions.GetBoards());

    this.boardsSub = this.store.select('b', 'boards').subscribe((state) => {
      this.loading = state.loading;

      if (state.loadSuccess) {
        this.boards = state.boards;
      }

      if (state.loadFailed) {
        this.boards = [];
      }
    });

    this.boardSub = this.store.select('b', 'board').subscribe((state) => {
      this.loading = state.loading;

      if (state.success) {
        this.openSnakBar(state.message, 'X', 'success-snackbar');
        this.store.dispatch(BoardActions.ResetBoardState());
        this.store.dispatch(BoardsActions.GetBoards());
      }

      if (state.error) {
        this.openSnakBar(state.message, 'X', 'error-snackbar');
      }
    });
  }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
    this.boardSub.unsubscribe();
  }

  addBoard(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '50rem',
      height: '20rem',
      data: { name: '', isPrivate: false },
    });

    dialogRef.afterClosed().subscribe((_board) => {
      this.board = {
        name: _board.name,
        privacy: _board.isPrivate ? 'PRIVATE' : 'PUBLIC',
      } as Board;

      this.store.dispatch(BoardActions.AddBoard({ board: this.board }));
    });
  }

  openSnakBar(message: string, action: string, clazz: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
