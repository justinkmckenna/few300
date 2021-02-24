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

  constructor(private actions$: Actions, private service: ProjectsDataService) { }
}
