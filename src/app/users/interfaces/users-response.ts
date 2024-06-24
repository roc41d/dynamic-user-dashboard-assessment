import { User } from './user';

export interface getUsersResponse {
  page: number;
  per_page: number;
  total_pages: number;
  total: number;
  data: User[];
}
