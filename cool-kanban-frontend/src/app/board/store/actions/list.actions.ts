import { createAction, props } from '@ngrx/store';
import { List } from '@shared/models/list';

export const UpdateList = createAction(
  '[Board] Update list',
  props<{ list: List }>()
);

export const UpdateListSuccess = createAction(
  '[Board] Update list successfully',
  props<{ list: List }>()
);

export const UpdateListFailed = createAction(
  '[Board] Update list failed',
  props<{ message: string }>()
);

export const ResetListState = createAction('[Board] Rest list state');
