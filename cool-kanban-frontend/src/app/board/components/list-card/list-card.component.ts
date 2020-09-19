import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Card } from '@shared/models/card';
import { List } from '@shared/models/list';
import { BAppState } from '../../store/reducers/b.reducers';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

import * as CardActions from '../../store/actions/card.actions';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() card: Card;
  @Input() idList: string;

  constructor(private store: Store<BAppState>, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openCardDialog(): void {
    const dialogRef = this.dialog.open(CardDialogComponent, {
      width: '50rem',
      height: '32rem',
      data: { ...this.card },
    });

    dialogRef.afterClosed().subscribe((_card) => {
      if (_card) {
        this.card = { ..._card, id: this.card.id };

        console.log('card', this.card);
        this.store.dispatch(CardActions.UpdateCard({ card: this.card }));
      }
    });
  }
}
