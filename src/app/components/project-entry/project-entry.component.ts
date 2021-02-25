import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectCreate, ProjectListItem } from 'src/app/models';
import { AppState, selectProjects } from 'src/app/reducers';
import * as actions from '../../actions/project.actions';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.css']
})
export class ProjectEntryComponent implements OnInit {

  form: FormGroup;

  projects$: Observable<ProjectListItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<ProjectEntryComponent>,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.projects$ = this.store.select(selectProjects);
  }

  submit(projects: ProjectListItem[]): void {
    if(!this.form.valid || this.projectNameNotUnique(projects)) {
      return;
    }
    const itemToAdd: ProjectCreate = {
      name: this.form.get('name').value
    }
    this.store.dispatch(actions.projectItemAdded({ item: itemToAdd }));
    this.bottomSheetRef.dismiss();
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

  projectNameNotUnique(projects: ProjectListItem[]) {
    const projectNames = projects.map(x => x.name);
    return projectNames.includes(this.form.get('name').value.trim().replace(' ', '-'));
  }

}

