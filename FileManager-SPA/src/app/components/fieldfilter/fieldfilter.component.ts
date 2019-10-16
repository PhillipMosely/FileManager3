import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Utilities } from 'app/_helpers/utilities';

@Component({
  selector: 'app-fieldfilter',
  templateUrl: './fieldfilter.component.html',
  styleUrls: ['./fieldfilter.component.css']
})
export class FieldFilterComponent implements OnInit, AfterViewInit {
  @Input() tableColumns: any[];
  @Output() refreshDataTable = new EventEmitter<any[]>();

  myUniqueID = Utilities.newGuid();
  bsFilterDateConfig: Partial<BsDatepickerConfig>;
  bsFilterDateInlineValue = new Date();
  filterTextInput = true;
  tableFilterTextInput = '';
  tableFilterDateInput = new Date();
  tableFilterQuery = [];

  constructor() { }

  ngOnInit() {
    this.bsFilterDateConfig = {
      containerClass: 'theme-default'
    };
  }

  ngAfterViewInit() {
    const myFilterSelect = document.getElementById(this.myUniqueID).getElementsByClassName('myFilterSelect');
    this.tableColumns.forEach(element => {
      if (element.text !== 'Actions') {
        const item = document.createElement('option');
        item.value = element.model;
        item.text = element.text;
        item.setAttribute('datatype', element.dataType);
        myFilterSelect[0].appendChild(item);
      }
    });
  }

  getLabel(modelName: string) {
    return Utilities.labelforModelName(modelName);
  }

  onDateValueChange(value: Date): void {
    this.tableFilterDateInput = value;
  }

  myTableFilterOnClick(clear: boolean): void {
    if (clear) {
        this.filterTextInput = true;
        this.tableFilterTextInput = '';
        this.bsFilterDateInlineValue = new Date();
        this.tableFilterDateInput = new Date();
        this.tableFilterQuery = [];
        const myFilterSelect = document.getElementById(this.myUniqueID).getElementsByClassName('myFilterSelect');
        if (!(myFilterSelect[0] === null)) {
          const mySelect = <any>myFilterSelect[0];
          mySelect.selectedIndex = 0;
          this.myFilterSelectonChange();
        }
        this.refreshDataTable.emit(this.tableFilterQuery);
    } else {
      const myFilterSelect = document.getElementById(this.myUniqueID).getElementsByClassName('myFilterSelect');
      if (!(myFilterSelect[0] === null)) {
        const mySelect = <any>myFilterSelect[0];
        const myFilterField = mySelect[mySelect.selectedIndex].value;
        if (myFilterField.toLowerCase().indexOf('date') >= 0) {
          this.tableFilterQuery.push({'field': myFilterField, 'filterDate': this.tableFilterDateInput});
        } else {
          this.tableFilterQuery.push({'field': myFilterField, 'filterText': this.tableFilterTextInput});
        }
        this.refreshDataTable.emit(this.tableFilterQuery);
      }
    }
  }

  myFilterSelectonChange(): void {
    const myFilterSelect = document.getElementById(this.myUniqueID).getElementsByClassName('myFilterSelect');
    const myFilterCondition = <any>(document.getElementById(this.myUniqueID).getElementsByClassName('myFilterCondition'));
    if (!(myFilterSelect[0] === null)) {
      const mySelect = <any>myFilterSelect[0];
      const myFilterField = mySelect[mySelect.selectedIndex].getAttribute('datatype');
      switch ( myFilterField ) {
        case 'text': {
          myFilterCondition[0].innerText = 'Contains';
          this.filterTextInput = true;
          break;
        }
        case 'number': {
          myFilterCondition[0].innerText = 'Larger Than';
          this.filterTextInput = true;
          break;
        }
        case 'date': {
          myFilterCondition[0].innerText = 'Later Than';
          this.filterTextInput = false;
          break;
        }
        default: {
          myFilterCondition[0].innerText = 'Contains'
          this.filterTextInput = true;
          break;
        }
      }
    }
  }
}
