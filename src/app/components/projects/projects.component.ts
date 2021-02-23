import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectListItem } from 'src/app/models';
import { AppState, selectProjects } from 'src/app/reducers';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects$: Observable<ProjectListItem[]>

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.projects$ = this.store.select(selectProjects);
  }

}
