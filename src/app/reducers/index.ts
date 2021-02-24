import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromTodos from './todos.reducer';
import * as fromProjects from './projects.reducer';
import * as fromAuth from './auth.reducer';
import * as models from '../models';

export interface AppState {
  todos: fromTodos.TodosState;
  projects: fromProjects.ProjectState,
  auth: fromAuth.AuthState,
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.reducer,
  projects: fromProjects.reducer,
  auth: fromAuth.reducer,
};

// 1 - Feature Selector

// 2 - One per branch/reducer
const selectTodosBranch = (state: AppState) => state.todos;
const selectProjectsBranch = (state: AppState) => state.projects;
const selectAuthBranch = (state: AppState) => state.auth;

// 3 - any helpers
const { selectAll: selectAllTodoArray } = fromTodos.adapter.getSelectors(selectTodosBranch);
const { selectAll: selectAllProjectArray } = fromProjects.adapter.getSelectors(selectProjectsBranch);

const selectTodoItemsListModel = createSelector(
  selectAllTodoArray,
  (todos) => todos as models.TodoListItem[]
);

// 4 - what your components need
export const selectInboxItems = createSelector(
  selectTodoItemsListModel,
  items => items.filter(item => !item.dueDate && !item.project)
);

export const selectProjectItems = createSelector(
  selectTodoItemsListModel,
  (todos, props: { project: string }) => {
    return todos.filter(todo => todo.project === props.project).map(todo => todo as models.TodoListItem);
  });

export const selectInboxItemsCount = createSelector(
  selectInboxItems,
  items => items.length
);

export const selectProjects = createSelector(
  selectAllProjectArray,
  selectTodoItemsListModel,
  (projects, todos) => {
    return projects.map(project => ({
      ...project,
      numberOfTodos: todos.filter(x => x.project === project.name).length
    } as models.ProjectListItem));
  }
);

export const selectIsLoggedIn = createSelector(
  selectAuthBranch,
  b => b.isLoggedIn
);

export const selectAuthToken = createSelector(
  selectAuthBranch,
  b => b.token
);
