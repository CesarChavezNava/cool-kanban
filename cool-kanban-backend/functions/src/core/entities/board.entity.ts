import { List } from './list.entity';
import { Profile } from './profile.entity';
import { Privacy } from '../types/privacy.type';

export interface Board {
  admin: Profile;
  id: string;
  lists: List[];
  name: string;
  privacy: Privacy;
  urlImage: string;
  users: Profile[];
}
