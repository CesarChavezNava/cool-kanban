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
  boards: Board[];
  loading: boolean = true;
  name: string;

  currentState: string = 'BoardsState';

  constructor(
    private store: Store<BAppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BoardsActions.GetBoards());

    this.boardsSub = this.store.select('b').subscribe((state) => {
      if (this.currentState === 'BoardsState') {
        const boardsState = state.boards;
        this.loading = boardsState.loading;

        if (boardsState.loadSuccess) {
          this.boards = boardsState.boards;
        }

        if (boardsState.loadFailed) {
          this.boards = [];
        }
      }

      if (this.currentState === 'BoardState') {
        const boardState = state.board;
        this.loading = boardState.loading;

        if (boardState.success) {
          this.openSnakBar(boardState.message, 'X', 'success-snackbar');
          this.currentState = 'BoardsState';
          this.store.dispatch(BoardsActions.GetBoards());
        }

        if (boardState.error) {
          this.openSnakBar(boardState.message, 'X', 'error-snackbar');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }

  addBoard(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '50rem',
      height: '20rem',
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe((_name) => {
      this.currentState = 'BoardState';

      const board: Board = {
        name: _name,
        privacy: 'PUBLIC',
      } as Board;

      this.store.dispatch(BoardActions.AddBoard({ board }));
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
