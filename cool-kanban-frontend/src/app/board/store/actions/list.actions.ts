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

export const MoveTo = createAction(
  '[Board] Move card in the same list',
  props<{ id: string; cards: string[] }>()
);

export const MoveToSuccess = createAction(
  '[Board] Move card in the same list successfully'
);

export const MoveToFailed = createAction(
  '[Board] Move card in the same list failed',
  props<{ message: string }>()
);

export const MoveFromTo = createAction(
  '[Board] Move card to another list',
  props<{
    previousIdList: string;
    currentIdList: string;
    previousCards: string[];
    currentCards: string[];
  }>()
);

export const MoveFromToSuccess = createAction(
  '[Board] Move card to another list successfully'
);

export const MoveFromToFailed = createAction(
  '[Board] Move card to another list failed',
  props<{ message: string }>()
);

export const ResetListState = createAction('[Board] Rest list state');
