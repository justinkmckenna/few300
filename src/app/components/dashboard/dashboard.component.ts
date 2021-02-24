import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadProjects } from 'src/app/actions/project.actions';
import { loadTodos } from 'src/app/actions/todo-item.actions';
import { AppState } from 'src/app/reducers';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    store.dispatch(loadTodos());
    store.dispatch(loadProjects());
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.inbox) {
        this.showInbox();
      }
      else if (params.project) {
        this.showProject(params.project);
      }
    });
  }

  private showInbox(): void {
    const dialog = this.dialog.open(ListComponent, { disableClose: true, data: { filter: 'inbox' } });
    dialog.afterClosed().subscribe(x => this.router.navigate(['dashboard']));
  }

  private showProject(name: string): void {
    const dialog = this.dialog.open(ListComponent, { disableClose: true, data: { filter: 'project', name } });
    dialog.afterClosed().subscribe(x => this.router.navigate(['dashboard']));
  }

}
