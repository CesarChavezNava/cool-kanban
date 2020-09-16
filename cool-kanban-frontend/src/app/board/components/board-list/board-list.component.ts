import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Card } from '@shared/models/card';
import { List } from '@shared/models/list';
import { Subscription } from 'rxjs';
import { BAppState } from '../../store/reducers/b.reducers';

import * as ListActions from '../../store/actions/list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  @Input() list: List;
  formGroup: FormGroup;
  listSubs: Subscription;
  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<BAppState>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [this.list.name ?? '', [Validators.required]],
    });

    this.listSubs = this.store.select('b', 'list').subscribe((state) => {
      if (state.success) {
        this.list = { ...state.list };
      }

      if (state.error) {
        this.openSnakBar(state.message, 'X', 'error-snackbar');
      }
    });
  }

  ngOnDestroy(): void {
    this.listSubs.unsubscribe();
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  editList(): void {
    this.edit = true;
  }

  updateList(): void {
    if (this.formGroup.invalid) return;

    this.list = { ...this.list, name: this.formGroup.get('name').value };
    this.store.dispatch(ListActions.UpdateList({ list: this.list }));

    this.edit = false;
  }

  addCard(): void {}

  openSnakBar(message: string, action: string, clazz: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
