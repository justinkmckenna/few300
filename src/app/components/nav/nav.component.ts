import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectIsLoggedIn } from 'src/app/reducers';
import * as actions from '../../actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  to(page: string): void {
    this.router.navigate([page]);
  }

  logout(): void {
    this.store.dispatch(actions.logoutRequested());
  }

}
