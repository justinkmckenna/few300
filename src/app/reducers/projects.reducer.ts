import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/project.actions';

export interface ProjectEntity {
  id: string;
  name: string;
}

export interface ProjectState extends EntityState<ProjectEntity> {

}

export const adapter = createEntityAdapter<ProjectEntity>();

const initialState = adapter.getInitialState();

// const fakeInitialState: ProjectState = {
//   ids: ['1','2','3'],
//   entities: {
//     1: { id: '1', name: 'Home' },
//     2: { id: '2', name: 'Work' },
//     3: { id: '3', name: 'Fitness' },
//   }
// }

const reducerFunction = createReducer(
  initialState,
  on(actions.loadProjectsSuccess, (state, action) => adapter.setAll(action.payload, state)),
  on(actions.projectItemAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.projectItemAddedSuccess, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, tempState);
  }),
  on(actions.projectItemAddedFailed, (state, action) => adapter.removeOne(action.payload.id, state)),
);

export function reducer(state: ProjectState = initialState, action: Action) {
  return reducerFunction(state, action);
}



