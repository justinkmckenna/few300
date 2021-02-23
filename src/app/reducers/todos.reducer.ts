import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-item.actions';

export interface TodoEntity {
  id: string;
  name: string;
  dueDate?: string;
  project?: string;
  completed: boolean;
}

export interface TodosState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

// const initialState = adapter.getInitialState();
const fakeInitialState: TodosState = {
  ids: ['1', '2'],
  entities: {
    1: { id: '1', name: 'Make Tacos', project: null, dueDate: null, completed: false },
    2: { id: '2', name: 'Make Salmon', project: 'Home', dueDate: '2021-02-23T00:00:00.000Z', completed: false },
    3: { id: '3', name: 'Clean Tacos', project: null, dueDate: '2021-02-25T00:00:00.000Z', completed: false },
  }
}

const reducerFunction = createReducer(
  fakeInitialState,
  on(actions.todoItemAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.todoItemCompleteToggle, (state, action) =>
    adapter.updateOne({ id: action.item.id, changes: { completed: !action.item.completed } }, state)
  )
);

export function reducer(state: TodosState = fakeInitialState, action: Action): TodosState {
  return reducerFunction(state, action);
}
