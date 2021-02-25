import { createAction, props } from '@ngrx/store';
import { ProjectCreate } from '../models';
import { ProjectEntity } from '../reducers/projects.reducer';

let fakeId = 1;

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

export const projectItemAdded = createAction(
  '[app] project item added',
  ({ item }: { item: ProjectCreate }) => ({
    payload: {
      id: 'T' + fakeId++,
      name: item.name.trim().replace(' ', '-')
    } as ProjectEntity
  })
);

export const projectItemAddedSuccess = createAction(
  '[app] project item added success',
  props<{payload: ProjectEntity, oldId: string}>()
);

export const projectItemAddedFailed = createAction(
  '[app] project item added failed',
  props<{payload: ProjectEntity, message: string}>()
);
