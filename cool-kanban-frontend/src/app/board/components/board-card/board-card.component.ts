import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board } from '@shared/models/board';
import { BAppState } from '../../store/reducers/b.reducers';

import * as BoardActions from '../../store/actions/board.actions';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {
  @Input() board: Board;

  constructor(private router: Router, private store: Store<BAppState>) {}

  ngOnInit(): void {}

  goToBoard(id: string): void {
    this.router.navigate([`b/${id}`]);
  }

  removeBoard(id: string): void {
    this.store.dispatch(BoardActions.RemoveBoard({ id }));
  }
}
