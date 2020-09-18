import { Card } from './card';

export interface List {
  id: string;
  idBoard: string;
  cards: Card[];
  name: string;
}
