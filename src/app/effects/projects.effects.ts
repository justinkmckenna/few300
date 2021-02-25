import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectsDataService } from "../services/projects.data-service";
import * as actions from '../actions/project.actions';
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ProjectsEffects {

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProjects),
      switchMap(() => this.service.getAllProjects().pipe(
        map(payload => actions.loadProjectsSuccess({ payload })),
        catchError(e => of(actions.loadProjectsFailed({ errorMessage: 'Failed to get Todos' })))
      )
      )
    ), {dispatch: true}
  );

  add$ = createEffect(() =>
        this.actions$.pipe(
          ofType(actions.projectItemAdded),
          switchMap((a) => this.service.addProject(a.payload).pipe(
            map(payload => actions.projectItemAddedSuccess({payload, oldId: a.payload.id})),
            catchError(e => of(actions.projectItemAddedFailed({payload: a.payload, message: e})))
          ))
        )
  );

  constructor(private actions$: Actions, private service: ProjectsDataService) { }
}
