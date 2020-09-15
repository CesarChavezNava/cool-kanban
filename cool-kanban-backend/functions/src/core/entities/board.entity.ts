import { Privacy } from '../types/privacy.type';
import { List } from './list.entity';
import { Profile } from './profile.entity';

export interface Board {
  id: string;
  admin: Profile;
  lists: List[];
  name: string;
  privacy: Privacy;
  users: Profile[];
}
