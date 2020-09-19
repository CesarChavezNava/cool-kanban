import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Card } from '@shared/models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _URL_SEGMENT: string = 'cards';

  constructor(private apiService: ApiService) {}

  save(card: Card): Observable<Card> {
    if (card.id) {
      return this.update(card);
    }

    return this.create(card);
  }

  delete(idList: string, id: string): Observable<void | object> {
    return this.apiService.delete(`${this._URL_SEGMENT}/${idList}/${id}`);
  }

  private create(card: Card): Observable<Card> {
    return this.apiService.post<Card>(this._URL_SEGMENT, card);
  }

  private update(card: Card): Observable<Card> {
    return this.apiService.put<Card>(`${this._URL_SEGMENT}/${card.id}`, card);
  }
}
