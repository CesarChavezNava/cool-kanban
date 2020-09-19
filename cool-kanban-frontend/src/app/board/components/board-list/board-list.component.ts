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
import * as CardActions from '../../store/actions/card.actions';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  @Input() list: List;
  @Input() idBoard: string;
  formGroup: FormGroup;
  listSubs: Subscription;
  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<BAppState>
  ) {}

  ngOnInit(): void {
    this.edit = this.list.name === '';

    this.formGroup = this.formBuilder.group({
      name: [this.list.name ?? '', [Validators.required]],
    });

    this.listSubs = this.store.select('b', 'list').subscribe((state) => {
      if (state.success) {
        this.list = { ...state.list };
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

  removeList(id: string) {
    this.store.dispatch(
      ListActions.RemoveList({ idBoard: this.idBoard, id: id })
    );
  }

  addCard(): void {
    const card: Card = {
      idList: this.list.id,
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'LOW',
    } as Card;

    console.log('card', card);
    this.store.dispatch(CardActions.AddCard({ card }));
  }
}
