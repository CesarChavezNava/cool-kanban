import { Injectable } from '@angular/core';
import { CardService } from '@core/http/card.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as CardActions from '../actions/card.actions';

@Injectable()
export class CardEffects {
  constructor(private action$: Actions, private cardService: CardService) {}

  AddCard$ = createEffect(() =>
    this.action$.pipe(
      ofType(CardActions.AddCard),
      switchMap((action) =>
        this.cardService.save(action.card).pipe(
          map((card) => CardActions.AddCardSuccess({ card })),
          catchError((error) => of(CardActions.AddCardFailed(error)))
        )
      )
    )
  );

  UpdateCard$ = createEffect(() =>
    this.action$.pipe(
      ofType(CardActions.UpdateCard),
      switchMap((action) =>
        this.cardService.save(action.card).pipe(
          map((card) => CardActions.UpdateCardSuccess({ card })),
          catchError((error) => of(CardActions.UpdateCardFailed(error)))
        )
      )
    )
  );

  RemoveCard$ = createEffect(() =>
    this.action$.pipe(
      ofType(CardActions.RemoveCard),
      switchMap((action) =>
        this.cardService.delete(action.idList, action.id).pipe(
          map(() => CardActions.RemoveCardSuccess()),
          catchError((error) => of(CardActions.RemoveCardFailed(error)))
        )
      )
    )
  );
}
