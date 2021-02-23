export interface TodoCreate {
  name: string;
  dueDate?: string;
  project?: string;
}

export interface TodoListItem extends TodoCreate {
  id: string;
  completed: boolean;
}
