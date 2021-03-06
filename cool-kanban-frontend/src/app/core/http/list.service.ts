import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { List } from '@shared/models/list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private _URL_SEGMENT: string = 'lists';

  constructor(private apiService: ApiService) {}

  save(list: List): Observable<List> {
    if (list.id) {
      return this.update(list);
    }

    return this.create(list);
  }

  delete(idBoard: string, id: string): Observable<void | object> {
    return this.apiService.delete(`${this._URL_SEGMENT}/${idBoard}/${id}`);
  }

  moveTo(id: string, cards: string[]): Observable<void> {
    return this.apiService.put(
      `${this._URL_SEGMENT}/move/${id}`,
      JSON.parse(`{ "cards": ${JSON.stringify(cards)}}`)
    );
  }

  moveFromTo(
    previousIdList: string,
    currentIdList: string,
    previousCards: string[],
    currentCards: string[]
  ): Observable<void> {
    return this.apiService.put(
      `${this._URL_SEGMENT}/move/${previousIdList}/${currentIdList}`,
      JSON.parse(
        `{ "source": ${JSON.stringify(previousCards)}, "dest": ${JSON.stringify(
          currentCards
        )}}`
      )
    );
  }

  private create(list: List): Observable<List> {
    return this.apiService.post<List>(this._URL_SEGMENT, list);
  }

  private update(list: List): Observable<List> {
    return this.apiService.put<List>(`${this._URL_SEGMENT}/${list.id}`, list);
  }
}
