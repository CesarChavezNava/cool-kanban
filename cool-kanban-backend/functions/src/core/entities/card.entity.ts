import { Priority } from '../types/priority.type';

export interface Card {
  creationDate: Date;
  description: string;
  dueDate: Date;
  id: string;
  priority: Priority;
  title: string;
}
