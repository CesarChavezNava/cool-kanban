import { Privacy } from '@core/types/privacy.type';
import { List } from './list';
import { Profile } from './profile';

export interface Board {
  id: string;
  admin: Profile;
  lists: List[];
  name: string;
  privacy: Privacy;
  users: Profile[];
}
