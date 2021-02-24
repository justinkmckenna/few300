import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkCreds } from './actions/auth.actions';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'few300';
  constructor(store: Store<AppState>) {
    store.dispatch(checkCreds());
  }
}
