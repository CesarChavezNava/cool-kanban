import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Card } from '@shared/models/card';
import { List } from '@shared/models/list';
import { Subject } from 'rxjs';
import { BAppState } from '../store/reducers/b.reducers';

import * as ListActions from '../store/actions/list.actions';

@Injectable({
  providedIn: 'root',
})
export class CardDragDropService {
  private _listsSource = new Subject<List[]>();
  private _lists: List[];
  private _previousIdList: string;

  lists$ = this._listsSource.asObservable();

  constructor(private store: Store<BAppState>) {}

  addLists(lists: List[]) {
    this._lists = [...lists];
    this._listsSource.next(this._lists);
  }

  drop(idList: string, event: CdkDragDrop<Card[]>) {
    const currentCards: Card[] = [...event.container.data];

    if (event.previousContainer === event.container) {
      moveItemInArray(currentCards, event.previousIndex, event.currentIndex);
      this.store.dispatch(
        ListActions.MoveTo({
          id: idList,
          cards: currentCards.map((_c) => _c.id),
        })
      );
      this.updateMoveItemInArray(idList, currentCards);
    } else {
      const previousCards: Card[] = [...event.previousContainer.data];

      transferArrayItem(
        previousCards,
        currentCards,
        event.previousIndex,
        event.currentIndex
      );
      this.store.dispatch(
        ListActions.MoveFromTo({
          previousIdList: this._previousIdList,
          currentIdList: idList,
          previousCards: previousCards.map((_c) => _c.id),
          currentCards: currentCards.map((_c) => _c.id),
        })
      );
      this.updateTransferArrayItem(idList, previousCards, currentCards);
    }
  }

  existed(previousIdList: string) {
    this._previousIdList = previousIdList;
  }

  private updateMoveItemInArray(idList: string, currentCards: Card[]) {
    let currentList: List = this._lists.find((_l) => _l.id === idList);
    currentList = { ...currentList, cards: currentCards };

    const newLists: List[] = [];
    this._lists.forEach((_l) => {
      if (_l.id === idList) newLists.push(currentList);
      else newLists.push(_l);
    });

    this._lists = [...newLists];
    this._listsSource.next(newLists);
  }

  private updateTransferArrayItem(
    idList: string,
    previousCards: Card[],
    currentCards: Card[]
  ) {
    let previousList: List = this._lists.find(
      (_l) => _l.id === this._previousIdList
    );
    previousList = { ...previousList, cards: previousCards };

    let currentList: List = this._lists.find((_l) => _l.id === idList);
    currentList = { ...currentList, cards: currentCards };

    const newLists: List[] = [];
    this._lists.forEach((_l) => {
      if (_l.id === this._previousIdList) newLists.push(previousList);
      else if (_l.id === idList) newLists.push(currentList);
      else newLists.push(_l);
    });

    this._lists = [...newLists];
    this._listsSource.next(this._lists);
  }
}
