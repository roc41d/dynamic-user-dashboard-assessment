import { User } from './user';

export interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
}
