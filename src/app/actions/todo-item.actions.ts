import { createAction, props } from '@ngrx/store';
import { TodoCreate } from '../models';
import { TodoEntity } from '../reducers/todos.reducer';

let fakeId = 1;
// initiator
// name, dueDate?, project?
export const todoItemAdded = createAction(
  '[app] todo item added',
  ({ item }: { item: TodoCreate }) => ({
    payload: {
      ...item,
      id: 'T' + fakeId++,
      completed: false
    } as TodoEntity
  })
);

export const todoItemAddedSuccess = createAction(
  '[app] todo item added success',
  props<{payload: TodoEntity, oldId: string}>()
);

export const todoItemAddedFailed = createAction(
  '[app] todo item added failed',
  props<{payload: TodoEntity, message: string}>()
);

export const todoItemCompleteToggle = createAction(
  '[app] todo item complete toggle',
  props<{ item: TodoEntity }>()
);

export const todoItemCompleteToggledSuccess = createAction(
  '[app] todo item complete toggled success'
);

export const todoItemCompleteToggledFailed = createAction(
  '[app] todo item complete toggled failed',
  props<{payload: TodoEntity, message: string}>()
);

export const updateItemProject = createAction(
  '[app] update item project',
  props<{ itemId: string, projectName: string }>()
);

export const updateItemProjectSuccess = createAction(
  '[app] update item project success'
);

export const updateItemProjectFailed = createAction(
  '[app] update item project failed',
  props<{itemId: string, orgProjectName: string, message: string}>()
);

export const loadTodos = createAction(
  '[app] load todos'
);


export const loadTodosSuccess = createAction(
  '[app] load todos success',
  props<{payload: TodoEntity[]}>()
);

export const loadTodosFailed = createAction(
  '[app] load todos failed',
  props<{errorMessage: string}>()
);
