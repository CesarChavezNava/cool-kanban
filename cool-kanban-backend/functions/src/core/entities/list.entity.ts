import { Card } from './card.entity';

export interface List {
  id: string;
  cards: Card[];
  name: string;
}
