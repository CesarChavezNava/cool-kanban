import { createAction, props } from '@ngrx/store';
import { Card } from '@shared/models/card';

export const AddCard = createAction(
  '[Board] Add new card',
  props<{ card: Card }>()
);

export const AddCardSuccess = createAction(
  '[Board] Add new card successfully',
  props<{ card: Card }>()
);

export const AddCardFailed = createAction(
  '[Board] Add new card failed',
  props<{ message: string }>()
);

export const UpdateCard = createAction(
  '[Board] Update card',
  props<{ card: Card }>()
);

export const UpdateCardSuccess = createAction(
  '[Board] Update card successfully',
  props<{ card: Card }>()
);

export const UpdateCardFailed = createAction(
  '[Board] Update card failed',
  props<{ message: string }>()
);

export const RemoveCard = createAction(
  '[Board] Remove card',
  props<{ idList: string; id: string }>()
);

export const RemoveCardSuccess = createAction(
  '[Board] Remove card successfully'
);

export const RemoveCardFailed = createAction(
  '[Board] Remove card failed',
  props<{ message: string }>()
);

export const ResetCardState = createAction('[Board] Rest card state');
