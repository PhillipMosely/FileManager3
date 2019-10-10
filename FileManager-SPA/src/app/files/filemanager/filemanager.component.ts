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
import { FolderNameComponent } from '../foldername/foldername.component';


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
  @ViewChild('myFolderName', {static: false}) myFolderName: FolderNameComponent;

  rowIndex: number;
  myAddButton: jqwidgets.jqxButton;
  myUpdateButton: jqwidgets.jqxButton;

  selectedNodeId = -1;
  data: any[];
  fmAdmin: FileManagerAdmin;
  source: any;
  dataAdapter: any;
  records: any;

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
        const buttondel = '<button (click)="" class="btn-sm btn-warning btn-link rowdelete"' +
                         ' title="Delete File"><i id="del' + row + '" class="fa fa-times"></i></button>';
        const item = '<div>' + buttonview + buttonedit + buttondel + '</div>';

        return item;
      }},
      { text: 'File Name', cellsAlign: 'left', align: 'left', dataField: 'fileName', width: 250 },
      { text: 'Size (kb)', dataField: 'sizeKb', cellsFormat: 'd1', cellsAlign: 'center', align: 'center', width: 120 },
      { text: 'Date Modified', cellsAlign: 'center', align: 'center', datafield: 'dateModified', width: 120, cellsFormat: 'd' },
      { text: 'Ext', cellsAlign: 'center', align: 'center', dataField: 'ext', width: 120 },
      { text: 'URL', cellsAlign: 'left', align: 'left', dataField: 'url', width: 810 }
      // { text: 'URL2', cellsAlign: 'left', align: 'left',  width: 400,
      // cellsRenderer: (row: number, column: string, value: any, rowData: any): string => {
      //   const item = '<div style="width: 400px; white-space: nowrap; overflow-x: scroll;">' + rowData.url + '</div>'
      //   return item;
      // }}
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
      // this.myTree.elementRef.nativeElement.firstChild.style.border = 'none';

      // const buttonadd = '<button (click)="" class="btn-sm btn-primary btn-round btn-icon"' +
      //                   ' style="position: relative; margin: 4px; float: left;"' +
      //                   ' title="Add File"><i class="nc-icon nc-simple-add"></i></button>Add File(s)';
      // const addtoolbar = document.getElementsByClassName('jqx-grid-toolbar');
      // const element = document.createElement('button');
      // element.innerHTML = buttonadd;
      // element.addEventListener('click', () => {
      //   window.dispatchEvent(new Event('custom-eventa'));
      // });
      // const inputgroup = addtoolbar[1].getElementsByClassName('jqx-input-group');
      // inputgroup[0].appendChild(element);
  }

  myTreeAddOnClick(): void {
    const selectedItem = this.myTree.getSelectedItem();
    if (selectedItem != null) {
        this.myFolderName.id =  this.GetNewNodeId().toString();
        this.myFolderName.folder = 'New Folder';
        this.myFolderName.addMode = true;
        this.openModal('foldernamemodal');
    }
  };

  myTreeUpdateOnClick(): void {
    const selectedItem = this.myTree.getSelectedItem();
    if (selectedItem != null) {
        this.myFolderName.id =  selectedItem.id;
        this.myFolderName.folder = selectedItem.label;
        this.myFolderName.addMode = false;
        this.openModal('foldernamemodal');
    }
  };

  myTreeAddUpdateFinish(updated: boolean): void {
    if ( !updated ) {
      this.closeModal('foldernamemodal')
      return;
    }
    const mySourceTree = this.myTree;
    const selectedItem = this.myTree.getSelectedItem();
    if (this.myFolderName.addMode) {
      this.myTree.addTo({ label: this.myFolderName.folder, id: this.myFolderName.id }, selectedItem.element);
    } else {
      this.myTree.updateItem({label: this.myFolderName.folder}, selectedItem.element);
    }
    this.fmAdmin.folderData = this.GetFolderDataString();
    this.fileManagerAdminService.updateFMAdmin(this.fmAdmin.id, this.fmAdmin).subscribe(next2 => {
      this.sweetAlertService.success('Successfully added folder');
    }, error2 => {
      this.myTree = mySourceTree;
      this.sweetAlertService.error('Not able to add folder');
    }, () => {
      this.closeModal('foldernamemodal')
      this.refreshDataTable();
      this.myTree.render();
    });
  }



  myTreeRemoveOnClick(): void {
    const selectedItem = this.myTree.getSelectedItem();
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
      const item: jqwidgets.TreeItem = this.myTree.getItems()[i];
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
      const item: jqwidgets.TreeItem = this.myTree.getItems()[i];
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
      this.fileService.getFiles(this.fmAdmin.id, this.selectedNodeId, 1, 200 ).subscribe(
          (res: PaginatedResult<APIFile[]>) => {
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
    const myDBId: number = this.myDataTable.getRows()[myId]['id'];

    this.sweetAlertService.message('clicked e');
  }
  @HostListener('window:custom-eventd', ['$event']) onClickd() {
    let myId: string = (<string>event['detail'])
    myId = myId.replace('del', '');
    const myDBId: number = this.myDataTable.getRows()[myId]['id'];
    const myFileName: string = this.myDataTable.getRows()[myId]['fileName'];
    this.sweetAlertService.confirm('Are you sure you want to delete \'' + myFileName + '\'', 'delete', () => {
      this.fileService.deleteFile(myDBId).subscribe(next => {
        this.refreshDataTable();
        this.sweetAlertService.success('Successfully deleted file');
      }, error => {
        this.sweetAlertService.error('Not able to delete file');
      });
    });

  }

  @HostListener('window:custom-eventa', ['$event']) onClicka() {
    const selectedItem = this.myTree.getSelectedItem();
    if (selectedItem != null) {
        this.myFileAdd.nodeId = this.selectedNodeId;
        this.myFileAdd.fmAdminId = this.fmAdmin.id;
        this.openModal('fileaddmodal');
    } else {
      this.sweetAlertService.message('Please select a folder');
    }
  }

  renderToolbar = (toolBar: any): void => {

    if (!(document.getElementsByClassName('ToolbarButtonDiv').length === 0)) {
      return;
    }

    const theme = jqx.theme;
    const toTheme = (className: string): string => {
        if (theme === '') {
          return className;
        }
        return className + ' ' + className + '-' + theme;
    }

    // appends buttons to the status bar.
    const container = document.createElement('div');
    const fragment = document.createDocumentFragment();
    container.style.cssText = 'overflow: hidden; position: hidden; height: "100%"; width: "100%"'
    container.className = 'ToolbarButtonDiv';

    const buttonadd = '<button class="btn btn-primary btn-link" style="margin: 0px;"' +
                      ' title="Add File"><i class="fa fa-plus"></i> Add File(s)</button>';
    const element = document.createElement('button');
    element.innerHTML = buttonadd;
    element.addEventListener('click', () => {
      window.dispatchEvent(new Event('custom-eventa'));
    });
    //fragment.appendChild(element);
    container.appendChild(element);
    toolBar[0].appendChild(container);
    debugger;
    //toolBar[0].style('visibility: inherit; left: 0px; top: 0px; position: absolute; width: 1134px; height: 34px;"border: none;"');

    // const createButtons = (name: string, cssClass: string, myTitle: string, myTextContent: string): any => {
    //     this[name] = document.createElement('div');
    //     this[name].style.cssText = 'padding: 3px; margin: 2px; float: left; border: none;';
    //     this[name].text = 'Add';
    //     const iconDiv = document.createElement('div');
    //     iconDiv.style.cssText = 'margin: 4px; width: 16px; height: 16px;'
    //     iconDiv.className = cssClass;
    //     iconDiv.title = myTitle;
    //     this[name].appendChild(iconDiv);
    //     return this[name];
    // }

    // container.appendChild(fragment);
    // toolBar[0].appendChild(container);
    // const addButtonOptions: jqwidgets.ButtonOptions = {
    //         height: 25, width: 25
    //     }
    // const otherButtonsOptions: jqwidgets.ButtonOptions = {
    //         disabled: true, height: 25, width: 25
    //     }
    // // we use TypeScript way of creating widgets here
    // this.myAddButton = jqwidgets.createInstance(buttons[0], 'jqxButton', addButtonOptions);
    // this.myUpdateButton = jqwidgets.createInstance(buttons[1], 'jqxButton', otherButtonsOptions);

    // const addTooltopOptions: jqwidgets.TooltipOptions = {
    //         position: 'bottom', content: 'Add'
    //     }
    // const updateTooltopOptions: jqwidgets.TooltipOptions = {
    //         position: 'bottom', content: 'Save Changes'
    //     }
    // const buttons = [
    //     createButtons('addButton', toTheme('jqx-icon-plus'), 'Upload File(s)', 'Upload'),
    //     createButtons('updateButton', toTheme('jqx-icon-save'), 'Update File', 'Update')
    // ];
    // for (let i = 0; i < buttons.length; i++) {
    //     fragment.appendChild(buttons[i]);
    // }

    // this.myAddButton.addEventHandler('click', (event: any) => {
    //     if (!this.myAddButton.disabled) {
    //         this.myFileAdd.nodeId = this.selectedNodeId;
    //         this.myFileAdd.fmAdminId = this.fmAdmin.id;
    //         this.openModal('fileaddmodal');
    //     }
    // });
    // this.myUpdateButton.addEventHandler('click', (event: any) => {
    //     if (!this.myUpdateButton.disabled) {
    //         // save changes.
    //         this.myDataTable.endRowEdit(this.rowIndex, false);
    //     }
    // });


};

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    if (id === 'fileaddmodal') {
      this.refreshDataTable();
    }
  }
}
