import { Card } from './card.entity';

export interface List {
  cards: Card[];
  id: string;
  name: string;
}
