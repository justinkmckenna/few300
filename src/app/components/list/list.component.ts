import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoListItem } from 'src/app/models';
import { AppState, selectInboxItems, selectProjectItems, selectProjects } from 'src/app/reducers';
import * as actions from '../../actions/todo-item.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list$: Observable<TodoListItem[]>;

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filter: string, name: string }
    ) { }

  ngOnInit(): void {
    switch(this.data.filter) {
      case 'inbox': {
        this.list$ = this.store.select(selectInboxItems);
        break;
      }

      case 'project': {
        this.list$ = this.store.select(selectProjectItems, { project: this.data.name });
        break;
      }

      default: {
        this.close();
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  markCompleteOrIncomplete(item: TodoListItem): void {
    this.store.dispatch(actions.todoItemCompleteToggle({item}));
  }

}
