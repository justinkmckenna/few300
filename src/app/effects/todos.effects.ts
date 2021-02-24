import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosDataService } from "../services/todos.data-service";
import * as actions from '../actions/todo-item.actions';
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class TodosEffects {

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadTodos),
      switchMap(() => this.service.getAllTodos().pipe(
        map(payload => actions.loadTodosSuccess({ payload })),
        catchError(e => of(actions.loadTodosFailed({ errorMessage: 'Failed to get Todos' })))
      )
      )
    ), {dispatch: true}
  );

  add$ = createEffect(() =>
        this.actions$.pipe(
          ofType(actions.todoItemAdded),
          switchMap((a) => this.service.addTodo(a.payload).pipe(
            map(payload => actions.todoItemAddedSuccess({payload, oldId: a.payload.id})),
            catchError(e => of(actions.todoItemAddedFailed({payload: a.payload, message: e})))
          ))
        )
  );

  constructor(private actions$: Actions, private service: TodosDataService) { }
}
