export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  color?: string;
  favorite: boolean;
  createdAt: string;
}
