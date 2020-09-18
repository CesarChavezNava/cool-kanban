import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Board } from '@shared/models/board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private _URL_SEGMENT: string = 'boards';

  constructor(private apiService: ApiService) {}

  get(id: string): Observable<Board> {
    return this.apiService.get<Board>(`${this._URL_SEGMENT}/${id}`);
  }

  getAll(): Observable<Board[]> {
    return this.apiService.getAll<Board>(`${this._URL_SEGMENT}`);
  }

  save(board: Board): Observable<Board> {
    if (board.id) {
      return this.update(board);
    }

    return this.create(board);
  }

  delete(id: string): Observable<void | object> {
    return this.apiService.delete(`${this._URL_SEGMENT}/${id}`);
  }

  private create(board: Board): Observable<Board> {
    return this.apiService.post<Board>(this._URL_SEGMENT, board);
  }

  private update(board: Board): Observable<Board> {
    return this.apiService.put<Board>(
      `${this._URL_SEGMENT}/${board.id}`,
      board
    );
  }
}
