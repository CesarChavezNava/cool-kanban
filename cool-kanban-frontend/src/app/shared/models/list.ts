import { Card } from './card';

export interface List {
  id: string;
  cards: Card[];
  name: string;
}
