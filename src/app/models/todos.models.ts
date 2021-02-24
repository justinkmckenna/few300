export interface TodoCreate {
  name: string;
  dueDate?: string;
  project?: string;
  completed: boolean;
}

export interface TodoListItem extends TodoCreate {
  id: string;
}
