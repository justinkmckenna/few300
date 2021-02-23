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

export const todoItemCompleteToggle = createAction(
  '[app] todo item complete toggle',
  props<{ item: TodoEntity }>()
);


// happy path
// after going to the api, dispatch an action that contains the api response
// replace the temporary added item with this real added item from the server

// errors
// after going to the api, dispatch an action with the api error if api fails
// tell the user about the error, remove the fake added item from the store
