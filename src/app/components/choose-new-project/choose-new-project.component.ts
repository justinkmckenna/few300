import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectListItem, TodoListItem } from 'src/app/models';
import { AppState, selectProjects } from 'src/app/reducers';
import * as actions from '../../actions/todo-item.actions';

@Component({
  selector: 'app-choose-new-project',
  templateUrl: './choose-new-project.component.html',
  styleUrls: ['./choose-new-project.component.css']
})
export class ChooseNewProjectComponent implements OnInit {

  projects$: Observable<ProjectListItem[]>;

  constructor(
    private store: Store<AppState>,
    private bottomSheetRef: MatBottomSheetRef<ChooseNewProjectComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { item: TodoListItem }
    ) { }

  ngOnInit(): void {
    this.projects$ = this.store.select(selectProjects);
  }

  changeProject(name: string): void {
    this.store.dispatch(actions.updateItemProject({itemId: this.data.item.id, projectName: name}));
    this.bottomSheetRef.dismiss();
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

}
