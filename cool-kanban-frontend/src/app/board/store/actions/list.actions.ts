import { createAction, props } from '@ngrx/store';
import { List } from '@shared/models/list';

export const CreateList = createAction(
  '[Board] Create list',
  props<{ list: List }>()
);

export const CreateListSuccess = createAction(
  '[Board] Create list successfully',
  props<{ list: List }>()
);

export const CreateListFailed = createAction(
  '[Board] Create list failed',
  props<{ message: string }>()
);

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

export const RemoveList = createAction(
  '[Board] Remove list',
  props<{ idBoard: string; id: string }>()
);

export const RemoveListSuccess = createAction(
  '[Board] Remove list successfully'
);

export const RemoveListFailed = createAction(
  '[Board] Remove list failed',
  props<{ message: string }>()
);

export const ResetListState = createAction('[Board] Rest list state');
