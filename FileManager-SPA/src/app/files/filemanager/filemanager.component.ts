import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';
import { FileManagerAdminService } from 'app/_services/filemanageradmin.service';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { FileService } from 'app/_services/file.service';
import { PaginatedResult } from 'app/_models/Pagination';
import { ModalService } from 'app/_services/modal.service';
import { FileAddModule } from '../fileadd/fileadd.module';
import { FileViewComponent } from '../fileview/fileview.component';
import { APIFile } from '../../_models/file';
import { User } from '../../_models/user';
import { FieldUpdateComponent } from 'app/components/fieldupdate/fieldupdate.component';
import { BsDatepickerConfig } from 'ngx-bootstrap';


@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements AfterViewInit, OnInit {
  @ViewChild('myTree', {static: false}) myTree: jqxTreeComponent;
  @ViewChild('ContentPanel', {static: false }) ContentPanel: ElementRef;
  @ViewChild('myDataTable', {static: false}) myDataTable: jqxDataTableComponent;
  @ViewChild('events', {static: false}) events: ElementRef;
  @ViewChild('myFileAdd', {static: false}) myFileAdd: FileAddModule;
  @ViewChild('myFileView', {static: false}) myFileView: FileViewComponent;
  @ViewChild('myFieldUpdate', {static: false}) myFieldUpdate: FieldUpdateComponent;

  selectedNodeId = -1;
  data: any[];
  fmAdmin: FileManagerAdmin;
  source: any;
  dataAdapter: any;
  records: any;
  bsFilterDateConfig: Partial<BsDatepickerConfig>;
  bsFilterDateInlineValue = new Date();

  filterTextInput = true;
  tableFilterTextInput = '';
  tableFilterDateInput = '';
  tableFilterQuery = [];
  tableWidth: number;
  tableSource: any;
  tableDataAdaptor: any;
  tableColumns: any[] =
  [
      { text: 'Actions', cellsAlign: 'center', align: 'center', width: 120,
      cellsRenderer: (row: number, column: string, value: any, rowData: any): string => {
        const buttonview = '<button (click)=""  class="btn-sm btn-info btn-link rowview"' +
                        ' title="View File Information"><i id="view' + row + '" class="fa fa-info"></i></button>';
        const buttonedit = '<button (click)=""  class="btn-sm btn-primary btn-link rowedit"' +
                         ' title="Edit File"><i id="edit' + row + '" class="fa fa-edit"></i></button>';
        const buttondel = '<button (click)="" class="btn-sm btn-danger btn-link rowdelete"' +
                         ' title="Delete File"><i id="del' + row + '" class="fa fa-times"></i></button>';
        const item = '<div>' + buttonview + buttonedit + buttondel + '</div>';

        return item;
      }},
      { text: 'File Name', cellsAlign: 'left', align: 'left', dataField: 'fileName', width: 250 },
      { text: 'Size (kb)', dataField: 'sizeKb', cellsFormat: 'd1', cellsAlign: 'center', align: 'center', width: 120 },
      { text: 'Date Modified', cellsAlign: 'center', align: 'center', datafield: 'dateModified', width: 120, cellsFormat: 'd' },
      { text: 'Ext', cellsAlign: 'center', align: 'center', dataField: 'ext', width: 120 },
      { text: 'URL', cellsAlign: 'left', align: 'left', dataField: 'url', width: 700 }
  ];

  constructor(private fileManagerAdminService: FileManagerAdminService,
              private fileService: FileService,
              private sweetAlertService: SweetAlertService,
              private modalService: ModalService) {
              }

  getTableWidth(): Number {
      this.tableColumns.forEach(element => {
          this.tableWidth += element.width;
      });
      return this.tableWidth;
  }

  ngOnInit() {
    this.bsFilterDateConfig = {
      containerClass: 'theme-default'
    };
     const myUser: User = JSON.parse(localStorage.getItem('user'));
     this.fileManagerAdminService.getFMAdminForUserId(myUser.id)
        .subscribe(
            (res: FileManagerAdmin) => {
                this.fmAdmin = res;
                this.data  = JSON.parse(this.fmAdmin.folderData);
                this.data.push({ 'id': '0', 'parentid': '-1', 'text': this.fmAdmin.subFolderName, 'value': ''  });
                this.source = {
                    datatype: 'json',
                    datafields: [
                        { name: 'id' },
                        { name: 'parentid' },
                        { name: 'text' },
                        { name: 'value' }
                    ],
                    id: 'id',
                    localdata: this.data
                    };
                  this.dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
                  this.records = this.dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
                  this.myTree.source(this.records);
                  this.myTree.expandItem(document.getElementById('0'));
                  this.myTree.refresh();
            }, error => {
                this.sweetAlertService.error('Could not load FM admin');
            }
        )
  }

  ngAfterViewInit() {
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

  myTreeAddOnClick(): void {
    const selectedItem = this.myTree.getSelectedItem();
    if (selectedItem != null) {
        this.myFieldUpdate.myId = this.GetNewNodeId();
        this.myFieldUpdate.myTitle = 'New Folder';
        this.myFieldUpdate.myType = 'New Folder';
        this.myFieldUpdate.myFields = [{field: 'Folder Name', value: 'New Folder', size: 50, type: 'Text'}];
        this.openModal('fieldupdatemodal');
    }
  };

  myTreeUpdateOnClick(): void {
    const selectedItem: any = this.myTree.getSelectedItem();
    if (selectedItem != null) {
        this.myFieldUpdate.myId = +selectedItem.id;
        this.myFieldUpdate.myTitle = 'Update Folder Name';
        this.myFieldUpdate.myType = 'Update Folder Name';
        this.myFieldUpdate.myFields = [{field: 'Folder Name', value: selectedItem.label, size: 50, type: 'Text'}];
        this.openModal('fieldupdatemodal');
    }
  };

  myTreeAddUpdateFinish(): void {
    const mySourceTree = this.myTree;
    const selectedItem = this.myTree.getSelectedItem();
    if (this.myFieldUpdate.myType === 'New Folder') {
      this.myTree.addTo({ label: this.myFieldUpdate.myFields[0].value, id: this.myFieldUpdate.myId }, selectedItem.element);
    } else {
      this.myTree.updateItem({label: this.myFieldUpdate.myFields[0].value}, selectedItem.element);
    }
    this.fmAdmin.folderData = this.GetFolderDataString();
    this.fileManagerAdminService.updateFMAdmin(this.fmAdmin.id, this.fmAdmin).subscribe(next2 => {
      this.sweetAlertService.success('Successfully added folder');
    }, error2 => {
      this.myTree = mySourceTree;
      this.sweetAlertService.error('Not able to add folder');
    }, () => {
      this.closeModal('fieldupdatemodal')
      this.refreshDataTable();
      this.myTree.render();
    });
  }



  myTreeRemoveOnClick(): void {
    const selectedItem: any = this.myTree.getSelectedItem();
    if (selectedItem != null) {
       this.sweetAlertService.confirm('Are you sure you want to delete \'' + selectedItem.label + '\'', 'delete', () => {
          const mySourceTree = this.myTree;
          this.myTree.removeItem(selectedItem.element);
          this.fmAdmin.folderData = this.GetFolderDataString();
          this.fileService.deleteFilesforFMNode(this.fmAdmin.id, +selectedItem.id).subscribe(next => {
            this.fileManagerAdminService.updateFMAdmin(this.fmAdmin.id, this.fmAdmin).subscribe(next2 => {
              this.refreshDataTable();
              this.myTree.render();
              this.sweetAlertService.success('Successfully deleted folder');

            }, error2 => {
              this.myTree = mySourceTree;
              this.myTree.render();
              this.sweetAlertService.error('Not able to delete folder');
            });

          }, error => {
            this.myTree = mySourceTree;
            this.sweetAlertService.error('Not able to delete files for folder');
            this.myTree.render();
          })

       });
    }
  };

  GetFolderDataString(): string {
    let myJSON = '';
    for ( let i = 0; i < this.myTree.getItems().length; i++) {
      const item: any = this.myTree.getItems()[i];
      if (item.id !== '0') {
        myJSON += (myJSON.length > 0 ? ',' : '[') + '{"id": "' + item.id +
        '", "text": "' + item.label +
        '", "parentid": "' + item.parentId +
        '", "value": "' + item.value + '"}';
      }
    }
    myJSON = (myJSON.length > 0 ? myJSON + ']' : '');
    return myJSON
  }

  GetNewNodeId(): number {
    let newNodeId = 1;
    for ( let i = 0; i < this.myTree.getItems().length; i++) {
      const item: any = this.myTree.getItems()[i];
      newNodeId = +item.id > newNodeId ? +item.id : newNodeId;
    }
    return newNodeId + 1;
  }

  select(event: any): void {
      this.selectedNodeId = event.args.element.id;
      this.refreshDataTable();
  }

  refreshDataTable() {
    // this.myFileAdd = new FileAddModule();
    if (this.fmAdmin != null) {
      this.fileService.getFiles(this.fmAdmin.id, this.selectedNodeId ).subscribe(
          (res: PaginatedResult<APIFile[]>) => {
              res = this.applyTableFilter(res);
              this.tableSource = {
                  dataType: 'json',
                  dataFields: [
                      { name: 'fileName', type: 'string' },
                      { name: 'ext', type: 'string' },
                      { name: 'url', type: 'string' },
                      { name: 'size', type: 'number' },
                      { name: 'sizeKb', type: 'number' },
                      { name: 'dateCreated', type: 'date' },
                      { name: 'dateModified', type: 'date' },
                      { name: 'description', type: 'string' },
                      { name: 'id', type: 'string'}
                  ],
                  localdata: res
              };
              this.tableDataAdaptor = new jqx.dataAdapter(this.tableSource);

          }, error => {
              this.sweetAlertService.error('Could not load Files');
          }
      );
    }
  }


  renderedRowButtons() {
    const viewbuttons = document.getElementsByClassName('rowview');
    for (let i = 0; i < viewbuttons.length; i++) {
      viewbuttons[i].addEventListener('click', () => {
          const target = (<Element>event.target) || (<Element>event.srcElement) || (<Element>event.currentTarget);
          const idAttr = target.id;
          window.dispatchEvent(new CustomEvent('custom-eventv', { detail: idAttr}));
        });
    }
    const editbuttons = document.getElementsByClassName('rowedit');
    for (let i = 0; i < editbuttons.length; i++) {
        editbuttons[i].addEventListener('click', () => {
          const target = (<Element>event.target) || (<Element>event.srcElement) || (<Element>event.currentTarget);
          const idAttr = target.id;
          window.dispatchEvent(new CustomEvent('custom-evente', { detail: idAttr}));
        });
    }

    const delbuttons = document.getElementsByClassName('rowdelete');
    for (let i = 0; i < delbuttons.length; i++) {
        delbuttons[i].addEventListener('click', () => {
          const target = (<Element>event.target) || (<Element>event.srcElement) || (<Element>event.currentTarget);
          const idAttr = target.id;
          window.dispatchEvent(new CustomEvent('custom-eventd', { detail: idAttr}));
        });
    }
  };


  @HostListener('window:custom-eventv', ['$event']) onClickv() {
    let myId: string = (<string>event['detail'])
    myId = myId.replace('view', '');
    const myDBId: number = this.myDataTable.getRows()[myId]['id'];
    this.fileService.getFile(myDBId).subscribe(next => {
      this.myFileView.myFile = next;
      this.openModal('fileviewmodal');
    }, error => {
      this.sweetAlertService.error('Not able to view file');
    })

  }
  @HostListener('window:custom-evente', ['$event']) onClicke() {
    let myId: string = (<string>event['detail'])
    myId = myId.replace('edit', '');
    let myFileName: string = this.myDataTable.getRows()[myId]['fileName'];
    const myExt: string = this.myDataTable.getRows()[myId]['ext'];
    myFileName = myFileName.replace(myExt, '');
    const myDBId: number = this.myDataTable.getRows()[myId]['id'];
    this.myFieldUpdate.myId = myDBId;
    this.myFieldUpdate.myTitle = 'File Name Update';
    this.myFieldUpdate.myType = 'File Name Update';
    this.myFieldUpdate.myFields = [{field: 'File Name', value: myFileName, size: 50, type: 'Text'}];
    this.openModal('fieldupdatemodal');
  }

  @HostListener('window:custom-eventd', ['$event']) onClickd() {
    let myId: string = (<string>event['detail'])
    myId = myId.replace('del', '');
    const myDBId: number = this.myDataTable.getRows()[myId]['id'];
    const myFileName: string = this.myDataTable.getRows()[myId]['fileName'];
    this.sweetAlertService.confirm('Are you sure you want to delete \'' + myFileName + '\'', 'delete', () => {
      this.fileService.deleteFile(myDBId).subscribe(next => {
        this.refreshDataTable();
      }, error => {
        this.sweetAlertService.error('Not able to delete file');
      });
    });

  }

  myTableAddOnClick(): void {
    const selectedItem = this.myTree.getSelectedItem();
    if (selectedItem != null) {
        this.myFileAdd.nodeId = this.selectedNodeId;
        this.myFileAdd.fmAdminId = this.fmAdmin.id;
        this.openModal('fileaddmodal');
    } else {
      this.sweetAlertService.message('Please select a folder');
    }
  }

  myTableFilterOnClick(clear: boolean): void {
    if (clear) {
        this.filterTextInput = true;
        this.tableFilterTextInput = '';
        this.bsFilterDateInlineValue = new Date();
        this.tableFilterQuery = [];
        const myFilterSelect = document.getElementsByClassName('myFilterSelect');
        if (!(myFilterSelect[0] === null)) {
          const mySelect = <any>myFilterSelect[0];
          this.myFilterSelectonChange();
          mySelect.selectedIndex = 0;
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
        case 'File Name':
        case 'Ext':
        case 'URL': {
          myFilterCondition[0].innerText = 'Contains';
          this.filterTextInput = true;
          break;
        }
        case 'Size (kb)': {
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
          myFilterCondition[0].innerText = 'Contains'
          this.filterTextInput = true;
          break;
        }
      }
    }
  }

  applyTableFilter(res: PaginatedResult<APIFile[]>): PaginatedResult<APIFile[]> {
    const myReturn: PaginatedResult<APIFile[]> = res;
    this.tableFilterQuery.forEach(filterItem => {
        switch ( filterItem.field ) {
          case 'File Name': {
            myReturn.result = myReturn.result.filter(x => x.fileName.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
            break;
          }
          case 'Size (kb)': {
            myReturn.result = myReturn.result.filter(x => x.size / 1000 > +(filterItem.filterText));
            break;
          }
          case 'Ext': {
            myReturn.result = myReturn.result.filter(x => x.ext.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
            break;
          }
          case 'URL': {
            myReturn.result = myReturn.result.filter(x => x.url.toLowerCase().indexOf(filterItem.filterText.toLowerCase()) >= 0);
            break;
          }
          case 'Date Modified': {
            myReturn.result = myReturn.result.filter(x => new Date(x.dateModified) > new Date(filterItem.filterDate));
            break;
          }
          case 'Date Created': {
            myReturn.result = myReturn.result.filter(x => new Date(x.dateCreated) > new Date(filterItem.filterDate));
            break;
          }
          default: {
            this.tableFilterTextInput = '';
            this.bsFilterDateInlineValue = new Date();
            this.tableFilterQuery = [];
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
    if (id === 'fileaddmodal') {
      this.refreshDataTable();
    }
  }

  myFieldUpdateFinish(updated: boolean) {
    if ( !updated ) {
      this.closeModal('fieldupdatemodal')
      return;
    }
    switch ( this.myFieldUpdate.myType ) {
      case 'File Name Update': {
        this.closeModal('fieldupdatemodal');
        this.fileService.getFile(this.myFieldUpdate.myId).subscribe(next => {
          next.fileName = this.myFieldUpdate.myFields[0].value + next.ext;
          this.fileService.updateFile(this.myFieldUpdate.myId, next).subscribe(next2 => {
            this.refreshDataTable();
            this.sweetAlertService.message('File name updated successfully');
          }, error => {
            this.sweetAlertService.error('Not able to update file name');
          })
        }, error => {
          this.sweetAlertService.error('Not able to update file name');
        })
        break;
      }
      case 'Update Folder Name':
      case 'New Folder': {
        this.myTreeAddUpdateFinish();
        break;
      }
      default: {
        break;
      }
  }

  }
}
