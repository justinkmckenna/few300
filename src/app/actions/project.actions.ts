import { createAction, props } from '@ngrx/store';
import { ProjectEntity } from '../reducers/projects.reducer';

export const loadProjects = createAction(
  '[app] load projects'
);


export const loadProjectsSuccess = createAction(
  '[app] load projects success',
  props<{payload: ProjectEntity[]}>()
);

export const loadProjectsFailed = createAction(
  '[app] load projects failed',
  props<{errorMessage: string}>()
);
