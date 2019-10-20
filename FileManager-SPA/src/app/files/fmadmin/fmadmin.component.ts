import { Component, OnInit, ViewChild, AfterViewInit, HostListener, EventEmitter } from '@angular/core';
import { jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';
import { FileManagerAdminService } from 'app/_services/filemanageradmin.service';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { ModalService } from 'app/_services/modal.service';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';
import { PaginatedResult } from 'app/_models/Pagination';
import { UserAddModule } from 'app/users/useradd/useradd.module';
import { UserEditModule } from 'app/users/useredit/useredit.module';
import { UserService } from 'app/_services/user.service';
import { Utilities } from 'app/_helpers/utilities';


@Component({
  selector: 'app-fmadmin',
  templateUrl: './fmadmin.component.html',
  styleUrls: ['./fmadmin.component.css']
})
export class FMAdminComponent implements AfterViewInit, OnInit {
  @ViewChild('myDataTable', {static: false}) myDataTable: jqxDataTableComponent;
  @ViewChild('myUserAdd', {static: false}) myUserAdd: UserAddModule;
  @ViewChild('myUserEdit', {static: false}) myUserEdit: UserEditModule;

  tableFilterQuery = [];
  tableWidth: number;
  tableSource: any;
  tableDataAdaptor: any;
  tableColumns: any[] =
  [
      { text: 'Actions', cellsAlign: 'center', align: 'center', width: 120,
      cellsRenderer: (row: number, column: string, value: any, rowData: any): string => {
        const buttonview = '<button (click)=""  class="btn-sm btn-info btn-link rowview"' +
                        ' title="View User Information"><i id="view' + row + '" class="fa fa-info"></i></button>';
        const buttonedit = '<button (click)=""  class="btn-sm btn-primary btn-link rowedit"' +
                         ' title="Edit User"><i id="edit' + row + '" class="fa fa-edit"></i></button>';
        const buttondel = '<button (click)="" class="btn-sm btn-danger btn-link rowdelete"' +
                         ' title="Delete User"><i id="del' + row + '" class="fa fa-times"></i></button>';
        const item = '<div>' + buttonview + buttonedit + buttondel + '</div>';

        return item;
      }},
      { text: this.getLabel('Company.CompanyName'), cellsAlign: 'left', align: 'left', dataField: 'companyName', width: 250,
          model: 'Company.CompanyName', dataType: 'text'  },
      { text: 'Username', cellsAlign: 'left', align: 'left', dataField: 'userName', width: 120,
          model: 'Username', dataType: 'text'  },
      { text: this.getLabel('User.Email'), cellsAlign: 'left', align: 'left',
          dataField: 'email', width: 250, model: 'User.Email', dataType: 'text'  },
      { text: this.getLabel('FileManagerAdmin.SubFolderName'), cellsAlign: 'left', align: 'left',
          dataField: 'subFolderName', width: 250, model: 'FileManagerAdmin.SubFolderName', dataType: 'text'  },
      { text: this.getLabel('FileManagerAdmin.DateModified'), cellsAlign: 'center', align: 'center',
          datafield: 'dateModified', width: 120, cellsFormat: 'd', model: 'FileManagerAdmin.DateModified', dataType: 'date'  }
  ];

  constructor(private fileManagerAdminService: FileManagerAdminService,
              private sweetAlertService: SweetAlertService,
              private modalService: ModalService,
              private userService: UserService) {
              }


  ngOnInit() {

  }

  ngAfterViewInit() {
    this.refreshDataTable();
  }

  getLabel(modelName: string) {
    return Utilities.labelforModelName(modelName);
  }

  getTableWidth(): Number {
    this.tableColumns.forEach(element => {
        this.tableWidth += element.width;
    });
    return this.tableWidth;
 }

 setTableFilter(query: any[]) {
  this.tableFilterQuery = query;
  this.refreshDataTable();
 }

 refreshDataTable() {
    this.fileManagerAdminService.getFMAdmins().subscribe(
        (res: PaginatedResult<FileManagerAdmin[]>) => {
            res = this.applyTableFilter(res);
            this.tableSource = {
                dataType: 'json',
                dataFields: [
                    { name: 'companyName', type: 'string' },
                    { name: 'userName', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'subFolderName', type: 'string' },
                    { name: 'dateCreated', type: 'date' },
                    { name: 'dateModified', type: 'date' },
                    { name: 'id', type: 'string'}
                ],
                localdata: res
            };

            this.tableDataAdaptor = new jqx.dataAdapter(this.tableSource);

        }, error => {
            this.sweetAlertService.error('Could not load File Manager Users');
        }
    );
}

renderedRowButtons() {
  const viewbuttons = document.getElementsByClassName('rowview');
  for (let i = 0; i < viewbuttons.length; i++) {
    viewbuttons[i].addEventListener('click', () => {
        const target = (<Element>event.target) || (<Element>event.srcElement) || (<Element>event.currentTarget);
        let idAttr = target.id;
        if (Utilities.detectIE()) {
          idAttr = target.firstElementChild.id;
          Utilities.createCustomEventIE('custom-eventv', idAttr);
        } else {
           window.dispatchEvent(new CustomEvent('custom-eventv', { detail: idAttr}));
        }
      });
  }
  const editbuttons = document.getElementsByClassName('rowedit');
  for (let i = 0; i < editbuttons.length; i++) {
      editbuttons[i].addEventListener('click', () => {
        const target = (<Element>event.target) || (<Element>event.srcElement) || (<Element>event.currentTarget);
        let idAttr = target.id;
        if (Utilities.detectIE()) {
          idAttr = target.firstElementChild.id;
          Utilities.createCustomEventIE('custom-evente', idAttr);
        } else {
          window.dispatchEvent(new CustomEvent('custom-evente', { detail: idAttr}));
        }
      });
  }

  const delbuttons = document.getElementsByClassName('rowdelete');
  for (let i = 0; i < delbuttons.length; i++) {
      delbuttons[i].addEventListener('click', () => {
        const target = (<Element>event.target) || (<Element>event.srcElement) || (<Element>event.currentTarget);
        let idAttr = target.id;
        if (Utilities.detectIE()) {
          idAttr = target.firstElementChild.id;
          Utilities.createCustomEventIE('custom-eventd', idAttr);
        } else {
          window.dispatchEvent(new CustomEvent('custom-eventd', { detail: idAttr}));
        }
      });
  }
};


@HostListener('window:custom-eventv', ['$event']) onClickv() {
  let myId: string = (<string>event['detail'])
  myId = myId.replace('view', '');
  const myDBId: number = this.myDataTable.getRows()[myId]['id'];
  this.fileManagerAdminService.getFMAdmin(myDBId).subscribe(next => {
    this.sweetAlertService.message('View FM Admin User coming soon');
    // this.openModal('fmadminviewmodal');
  }, error => {
    this.sweetAlertService.error('Not able to view User');
  })

}
@HostListener('window:custom-evente', ['$event']) onClicke() {
  let myId: string = (<string>event['detail'])
  myId = myId.replace('edit', '');
  const myDBId: number = this.myDataTable.getRows()[myId]['id'];
  this.userService.getUser(myDBId).subscribe( next => {
    this.myUserEdit.useCloseEvent = true;
    this.myUserEdit.user = next;
    this.openModal('fmadminupdatemodal');
  }, error => {
    this.sweetAlertService.error('Not able to Edit User');
  })

}

@HostListener('window:custom-eventd', ['$event']) onClickd() {
  let myId: string = (<string>event['detail'])
  myId = myId.replace('del', '');
  const myDBId: number = this.myDataTable.getRows()[myId]['id'];
  const myUserName: string = this.myDataTable.getRows()[myId]['userName'];
  this.sweetAlertService.confirm('Are you sure you want to delete \'' + myUserName + '\'', 'delete', () => {
    this.fileManagerAdminService.deleteFMAdmin(myDBId).subscribe(next => {
      this.refreshDataTable();
    }, error => {
      this.sweetAlertService.error('Not able to delete user');
    });
  });

}

myTableAddOnClick(): void {
  this.myUserAdd.useCloseEvent = true;
  this.openModal('fmadminaddmodal');
}

applyTableFilter(res: PaginatedResult<FileManagerAdmin[]>): PaginatedResult<FileManagerAdmin[]> {
  const myReturn: PaginatedResult<FileManagerAdmin[]> = res;
  this.tableFilterQuery.forEach(filterItem => {
      switch ( filterItem.field ) {
        case 'Company.CompanyName': {
          myReturn.result = myReturn.result.filter(
            x => x.companyName.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
          break;
        }
        case 'Username': {
          myReturn.result = myReturn.result.filter(
            x => x.userName.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
          break;
        }
        case 'User.Email': {
          myReturn.result = myReturn.result.filter(
            x => x.email.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
          break;
        }
        case 'FileManagerAdmin.SubFolderName': {
          myReturn.result = myReturn.result.filter(
            x => x.subFolderName.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
          break;
        }
        case 'FileManagerAdmin.DateModified': {
          myReturn.result = myReturn.result.filter(x => new Date(x.dateModified) > new Date(filterItem.filterDate));
          break;
        }
        case 'FileManagerAdmin.DateCreated': {
          myReturn.result = myReturn.result.filter(x => new Date(x.dateCreated) > new Date(filterItem.filterDate));
          break;
        }
        default: {
          break;
        }
    }
  });

  return myReturn;
}

openModal(id: string) {
  this.modalService.open(id);
}

closeModal(id: string) {
  this.modalService.close(id);
  if (id === 'fmadminaddmodal' || id === 'fmadminupdatemodal') {
    this.refreshDataTable();
  }
}


}
