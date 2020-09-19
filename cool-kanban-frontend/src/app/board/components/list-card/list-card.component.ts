import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Card } from '@shared/models/card';
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
  formGroup: FormGroup;
  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<BAppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.edit = this.card.title === '';

    this.formGroup = this.formBuilder.group({
      title: [this.card.title ?? '', [Validators.required]],
    });
  }

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

  updateCard(): void {
    if (this.formGroup.invalid) return;

    this.card = { ...this.card, title: this.formGroup.get('title').value };
    this.store.dispatch(CardActions.UpdateCard({ card: this.card }));

    this.edit = false;
  }
}
