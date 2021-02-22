import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import { TodoEntryComponent } from '../todo-entry/todo-entry.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  bottomSheetConfig: MatBottomSheetConfig = {
    disableClose: true,
    autoFocus: true
  }

  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  addItem(): void {
    this._bottomSheet.open(TodoEntryComponent, this.bottomSheetConfig);
  }

}
