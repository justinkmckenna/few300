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

const initialState = adapter.getInitialState();
// const fakeInitialState: TodosState = {
//   ids: ['1', '2'],
//   entities: {
//     1: { id: '1', name: 'Make Tacos', project: null, dueDate: null, completed: false },
//     2: { id: '2', name: 'Make Salmon', project: 'Home', dueDate: '2021-02-23T00:00:00.000Z', completed: false },
//     3: { id: '3', name: 'Clean Tacos', project: null, dueDate: '2021-02-25T00:00:00.000Z', completed: false },
//   }
// }

const reducerFunction = createReducer(
  initialState,
  on(actions.todoItemAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.todoItemAddedSuccess, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, tempState);
  }),
  on(actions.todoItemAddedFailed, (state, action) => adapter.removeOne(action.payload.id, state)),
  // Could add the item this way, but above looks cleaner and protects against the actual item somehow changing in the API
  // on(actions.todoItemAddedSuccess, (state, action) => adapter.updateOne({
  //   id: action.oldId,
  //   changes: {
  //     id: action.payload.id
  //   }
  // }, state)),
  on(actions.todoItemCompleteToggle, (state, action) =>
    adapter.updateOne({ id: action.item.id, changes: { completed: !action.item.completed } }, state)
  ),
  on(actions.todoItemCompleteToggledFailed, (state, action) => adapter.removeOne(action.payload.id, state)),
  on(actions.loadTodosSuccess, (state, action) => adapter.setAll(action.payload, state))
);

export function reducer(state: TodosState = initialState, action: Action): TodosState {
  return reducerFunction(state, action);
}
