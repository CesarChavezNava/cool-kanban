import { Action, createReducer, on } from '@ngrx/store';
import { Card } from '@shared/models/card';

import * as CardActions from '../actions/card.actions';

export interface CardState {
  id: string;
  card: Card;
  loading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export const cardInitialState: CardState = {
  id: null,
  card: null,
  loading: false,
  success: false,
  error: false,
  message: null,
};

const _cardReducer = createReducer(
  cardInitialState,
  // ADD
  on(CardActions.AddCard, (state, { card }) => ({
    ...state,
    id: null,
    card: card,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(CardActions.AddCardSuccess, (state, { card }) => ({
    ...state,
    id: null,
    card: card,
    loading: false,
    success: true,
    error: false,
    message: 'Card has been added successfully',
  })),
  on(CardActions.AddCardFailed, (state, { message }) => ({
    ...state,
    id: null,
    card: null,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  // UPDATE
  on(CardActions.UpdateCard, (state, { card }) => ({
    ...state,
    id: null,
    card: card,
    loading: false,
    success: false,
    error: false,
    message: null,
  })),
  on(CardActions.UpdateCardSuccess, (state, { card }) => ({
    ...state,
    id: null,
    card: card,
    loading: false,
    success: true,
    error: false,
    message: 'Card has been updated successfully',
  })),
  on(CardActions.UpdateCardFailed, (state, { message }) => ({
    ...state,
    id: null,
    board: null,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  // REMOVE
  on(CardActions.RemoveCard, (state, { id }) => ({
    ...state,
    id: id,
    card: null,
    loading: true,
    success: false,
    error: false,
    message: null,
  })),
  on(CardActions.RemoveCardSuccess, (state) => ({
    ...state,
    id: null,
    card: null,
    loading: false,
    success: true,
    error: false,
    message: 'Card has been removed successfully',
  })),
  on(CardActions.RemoveCardFailed, (state, { message }) => ({
    ...state,
    id: null,
    card: null,
    loading: false,
    success: false,
    error: true,
    message: message,
  })),
  on(CardActions.ResetCardState, (state) => cardInitialState)
);

export function cardReducer(state: CardState, action: Action) {
  return _cardReducer(state, action);
}
