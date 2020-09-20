import {
  CdkDragDrop,
  CdkDragStart,
  CdkDragEnter,
  CdkDragExit,
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
import { CardDragDropService } from '../../services/card-drag-drop.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  @Input() connectTo: string[];
  @Input() list: List;
  @Input() idBoard: string;
  formGroup: FormGroup;
  listSubs: Subscription;
  edit: boolean = false;

  _cards: Card[];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<BAppState>,
    private dragDropService: CardDragDropService
  ) {}

  ngOnInit(): void {
    this._cards = this.list?.cards;
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
    this.dragDropService.drop(this.list.id, event);
  }

  exited(event: CdkDragExit<Card[]>) {
    this.dragDropService.existed(this.list.id);
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
