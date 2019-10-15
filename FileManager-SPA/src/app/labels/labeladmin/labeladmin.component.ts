import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';
import { PaginatedResult } from 'app/_models/Pagination';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { User } from 'app/_models/user';
import { Company } from 'app/_models/company';
import { LabelService } from 'app/_services/label.service';
import { Label } from 'app/_models/label';
import { ModalService } from 'app/_services/modal.service';
import { FieldUpdateComponent } from 'app/components/fieldupdate/fieldupdate.component';

@Component({
  selector: 'app-labeladmin',
  templateUrl: './labeladmin.component.html',
  styleUrls: ['./labeladmin.component.css']
})
export class LabelAdminComponent implements AfterViewInit, OnInit {
  @ViewChild('myDataTable', {static: false}) myDataTable: jqxDataTableComponent;
  @ViewChild('myFieldUpdate', {static: false}) myFieldUpdate: FieldUpdateComponent;

  myCompany: Company;

  bsFilterDateConfig: Partial<BsDatepickerConfig>;
  bsFilterDateInlineValue = new Date();
  filterTextInput = true;
  tableFilterTextInput = '';
  tableFilterDateInput = new Date();
  tableFilterQuery = [];
  tableWidth: number;
  tableSource: any;
  tableDataAdaptor: any;
  tableColumns: any[] =
  [
      { text: 'Actions', cellsAlign: 'center', align: 'center', width: 80,
      cellsRenderer: (row: number, column: string, value: any, rowData: any): string => {
        const buttonedit = '<button (click)=""  class="btn-sm btn-primary btn-link rowedit"' +
                         ' title="Edit Label"><i id="edit' + row + '" class="fa fa-edit"></i></button>';
        const item = '<div>' + buttonedit + '</div>';

        return item;
      }},
      { text: 'Model Name', cellsAlign: 'left', align: 'left', dataField: 'modelName', width: 300 },
      { text: 'Label Name', cellsAlign: 'left', align: 'left', dataField: 'labelName', width: 300 }

  ];


  constructor(private sweetAlertService: SweetAlertService,
              private labelService: LabelService,
              private modalService: ModalService) { }

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.myCompany = user.company;
  }

  ngAfterViewInit() {
    this.refreshDataTable();
    const myFilterSelect = document.getElementsByClassName('myFilterSelect');
    this.tableColumns.forEach(element => {
      if (element.text !== 'Actions') {
        const item = document.createElement('option');
        item.value = element.text;
        item.text = element.text;
        myFilterSelect[0].appendChild(item);
      }
    });
  }

  getTableWidth(): Number {
    this.tableColumns.forEach(element => {
        this.tableWidth += element.width;
    });
    return this.tableWidth;
 }

 refreshDataTable() {
    this.labelService.getLabelsforCompany(this.myCompany.id).subscribe(
        (res: PaginatedResult<Label[]>) => {
            res = this.applyTableFilter(res);
            this.tableSource = {
                dataType: 'json',
                dataFields: [
                    { name: 'modelName', type: 'string' },
                    { name: 'labelName', type: 'string' },
                    { name: 'id', type: 'string'}
                ],
                localdata: res
            };

            this.tableDataAdaptor = new jqx.dataAdapter(this.tableSource);

        }, error => {
            this.sweetAlertService.error('Could not load Labels');
        }
    );
}

renderedRowButtons() {
  const editbuttons = document.getElementsByClassName('rowedit');
  for (let i = 0; i < editbuttons.length; i++) {
      editbuttons[i].addEventListener('click', () => {
        const target = (<Element>event.target) || (<Element>event.srcElement) || (<Element>event.currentTarget);
        const idAttr = target.id;
        window.dispatchEvent(new CustomEvent('custom-evente', { detail: idAttr}));
      });
  }

};


@HostListener('window:custom-evente', ['$event']) onClicke() {
  let myId: string = (<string>event['detail'])
  myId = myId.replace('edit', '');
  const myDBId: number = this.myDataTable.getRows()[myId]['id'];
  this.labelService.getLabel(myDBId).subscribe( next => {
    this.myFieldUpdate.myId = myDBId;
    this.myFieldUpdate.myTitle = 'Label for ' + next.modelName;
    this.myFieldUpdate.myType = 'Label Name';
    this.myFieldUpdate.myFields = [{field: 'Label Name', value: next.labelName, size: 50, type: 'Text'}];
    this.openModal('fieldupdatemodal');
  }, error => {
    this.sweetAlertService.error('Not able to Edit Label');
  })

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
    const myFilterSelect = document.getElementsByClassName('myFilterSelect');
    if (!(myFilterSelect[0] === null)) {
      const mySelect = <any>myFilterSelect[0];
      mySelect.selectedIndex = 0;
      this.myFilterSelectonChange();
    }
    this.refreshDataTable();
  } else {
    const myFilterSelect = document.getElementsByClassName('myFilterSelect');
    if (!(myFilterSelect[0] === null)) {
      const mySelect = <any>myFilterSelect[0];
      const myFilterField = mySelect[mySelect.selectedIndex].text;
      if (myFilterField.toLowerCase().indexOf('date') >= 0) {
        this.tableFilterQuery.push({'field': myFilterField, 'filterDate': this.tableFilterDateInput});
      } else {
        this.tableFilterQuery.push({'field': myFilterField, 'filterText': this.tableFilterTextInput});
      }
      this.refreshDataTable();
    }
  }
}

myFilterSelectonChange(): void {
  const myFilterSelect = document.getElementsByClassName('myFilterSelect');
  const myFilterCondition = <any>document.getElementsByClassName('myFilterCondition');
  if (!(myFilterSelect[0] === null)) {
    const mySelect = <any>myFilterSelect[0];
    const myFilterField = mySelect[mySelect.selectedIndex].text;
    switch ( myFilterField ) {
      case 'Company':
      case 'Username':
      case 'Email':
      case 'Sub Folder': {
        myFilterCondition[0].innerText = 'Contains';
        this.filterTextInput = true;
        break;
      }
      case 'File Count': {
        myFilterCondition[0].innerText = 'Larger Than';
        this.filterTextInput = true;
        break;
      }
      case 'Date Modified':
      case 'Date Created': {
        myFilterCondition[0].innerText = 'Later Than';
        this.filterTextInput = false;
        break;
      }
      default: {
        myFilterCondition[0].innerText = 'Contains';
        this.filterTextInput = true;
        break;
      }
    }
  }
}

applyTableFilter(res: PaginatedResult<Label[]>): PaginatedResult<Label[]> {
  const myReturn: PaginatedResult<Label[]> = res;
  this.tableFilterQuery.forEach(filterItem => {
      switch ( filterItem.field ) {
        case 'Model Name': {
          myReturn.result = myReturn.result.filter(
            x => x.modelName.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
          break;
        }
        case 'Label Name': {
          myReturn.result = myReturn.result.filter(
            x => x.labelName.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
          break;
        }
        default: {
          this.tableFilterTextInput = '';
          this.bsFilterDateInlineValue = new Date();
          this.tableFilterDateInput = new Date();      
          this.tableFilterQuery = [];
          break;
        }
    }
  });

  return myReturn;
}

myFieldUpdateFinish(updated: boolean) {
  if ( !updated ) {
    this.closeModal('fieldupdatemodal')
    return;
  }
  this.labelService.getLabel(this.myFieldUpdate.myId).subscribe(next => {
    const myLabel = next;
    myLabel.labelName = this.myFieldUpdate.myFields[0].value;
    this.labelService.updateLabel(this.myFieldUpdate.myId, myLabel).subscribe(next2 => {
      this.refreshDataTable();
      this.sweetAlertService.message('Label name updated successfully');
    }, error2 => {
      this.sweetAlertService.error('Not able to update label name');
    });
  }, error => {
    this.sweetAlertService.error('Not able to update label name');
  })
}

openModal(id: string) {
  this.modalService.open(id);
}

closeModal(id: string) {
  this.modalService.close(id);
  if (id === 'labelupdatemodal') {
    this.refreshDataTable();
  }
}

}
