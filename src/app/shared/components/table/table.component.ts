import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  // Table Settings
  @Input() columnsConfig!: {
    //Header titles
    titles: any;
    //Type of field text, currency or input
    types: any;
    //Check if the field must be disabled
    isDisabled: Function;
    //Validate navigation
    navigate: Function;
  };
  // Data to table
  @Input() data!: Observable<any>;
  // Used in case of form in table
  @Input() form!: FormGroup;
  @Output() valueChangesForm = new EventEmitter();

  // Material table settings
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[];

  constructor() {}

  ngOnInit(): void {
    this.initTable();

    this.emitterValueChangesForm();
  }

  initTable = (): void => {
    if (this.data) {
      this.displayedColumns = Object.keys(this.columnsConfig?.titles);

      this.data.pipe(take(1)).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      });
    }
  };

  emitterValueChangesForm = () => {
    if (this.form) {
      this.form.valueChanges.subscribe((res) => {
        this.valueChangesForm.emit(res);
      });
    }
  };
}
