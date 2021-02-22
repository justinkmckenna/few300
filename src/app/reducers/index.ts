import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromTodos from './todos.reducer';
import * as models from '../models';

export interface AppState {
  todos: fromTodos.TodosState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.reducer
};

// 1 - Feature Selector

// 2 - One per branch/reducer
const selectTodosBranch = (state: AppState) => state.todos;

// 3 - any helpers
const { selectAll: selectAllTodoArray } = fromTodos.adapter.getSelectors(selectTodosBranch);

const selectTodoItemsListModel = createSelector(
  selectAllTodoArray,
  (todos) => todos as models.TodoListItem[]
);

// 4 - what your components need
export const selectInboxItems = createSelector(
  selectTodoItemsListModel,
  items => items.filter(item => !item.dueDate && !item.project)
);

export const selectInboxItemsCount = createSelector(
  selectInboxItems,
  items => items.length
);
