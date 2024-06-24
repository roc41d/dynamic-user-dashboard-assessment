import { User } from "./user";

export interface UserDetailState {
  user: User;
  loading: boolean;
  error: string | null;
}
