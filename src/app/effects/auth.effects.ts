import { createEffect, ofType, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // NOTE: Only this one ever. never the.prod or whatever.
import * as authActions from '../actions/auth.actions';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {

  readonly baseUri = environment.apiUrl;

  // logInRequested => (posting it to the API) => (loginSucceeded | loginFailed)
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      switchMap(request => this.client.post<{ access_token: string }>(this.baseUri + 'auth/login', {
        username: request.username,
        password: request.password
      }).pipe(
        map(response => authActions.loginSuccess({ username: request.username, token: response.access_token })),
        catchError(() => of(authActions.loginFailed({ reason: 'Sorry Cannot Login' })))
      )
      )
    ), { dispatch: true }
  );

  loginSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.loginSuccess),
    tap(() => this.router.navigate(['dashboard']))
  )
  , {dispatch: false}
  );

  loginSuccessSaveToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(a => {
        localStorage.setItem('token', a.token);
        const tokenData = JSON.parse(atob(a.token.split('.')[1])) as {exp: number, username: string};
        const date = new Date();
        date.setUTCSeconds(tokenData.exp);
        localStorage.setItem('token-exp', JSON.stringify(date));
        localStorage.setItem('username', JSON.stringify(tokenData.username));
      }
      )
    ), {dispatch: false}
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(authActions.logoutRequested),
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('token-exp');
          localStorage.removeItem('username');
          this.router.navigate(['login']);
        })
      ), {dispatch: false}
  );

  checkForCredentials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.checkCreds),
      map(() => {
        // read the token and stuff. If it is expired or not there, return null
        const expire = localStorage.getItem('token-exp');
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        if (expire && username && token) {
          const expireDate = new Date(JSON.parse(expire));
          if (expireDate > new Date()) {
            return ({ expire, username, token });
          } else {
            return null;
          }
        } else {
          return null;
        }
      }),
      filter((t: { expire: string; username: string, token: string }) => t !== null), // stop here if it isn't a good set of credentials
      map(t => authActions.loginSuccess({ username: t.username, token: t.token }))
    )
    , { dispatch: true });

  constructor(
    private actions$: Actions,
    private client: HttpClient,
    private router: Router,
  ) { }
}
