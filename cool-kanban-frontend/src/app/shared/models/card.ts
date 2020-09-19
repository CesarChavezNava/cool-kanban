import { Priority } from '@core/types/priority.type';

export interface Card {
  idList: string;
  id: string;
  creationDate: Date;
  description: string;
  dueDate: Date;
  priority: Priority;
  title: string;
}
