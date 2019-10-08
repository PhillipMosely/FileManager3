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
        const buttonedit = '<button (click)=""  class="btn btn-primary btn-link btn-icon edit rowedit"' +
                         ' title="Edit File"><i id="edit' + row + '" class="fa fa-edit"></i></button>';
        const buttondel = '<button (click)="" class="btn btn-warning btn-link btn-icon remove rowdelete"' +
                         ' title="Delete File"><i id="del' + row + '" class="fa fa-times"></i></button>';
        const item = '<div>' + buttonedit + buttondel + '</div>';

        return item;
      }},
      { text: 'File Name', cellsAlign: 'left', align: 'left', dataField: 'fileName', width: 250 },
      { text: 'Size (kb)', dataField: 'sizeKb', cellsFormat: 'd1', cellsAlign: 'center', align: 'center', width: 120 },
      { text: 'Date Modified', cellsAlign: 'center', align: 'center', datafield: 'dateModified', width: 120, cellsFormat: 'd' },
      { text: 'Ext', cellsAlign: 'center', align: 'center', dataField: 'ext', width: 120 },
      { text: 'URL', cellsAlign: 'left', align: 'left', dataField: 'url', width: 400 },
      { text: 'URL2', cellsAlign: 'left', align: 'left',  width: 400,
      cellsRenderer: (row: number, column: string, value: any, rowData: any): string => {
        const item = '<div style="width: 400px; white-space: nowrap; overflow-x: scroll;">' + rowData.url + '</div>'
        return item;
      }}
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
     this.fileManagerAdminService.getFMAdminForUserId(2)
        .subscribe(
            (res: FileManagerAdmin) => {
                this.fmAdmin = res;
                this.data  = JSON.parse(this.fmAdmin.folderData);
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
                  this.myTree.refresh();
            }, error => {
                this.sweetAlertService.error('Could not load FM admin');
            }
        )
  }

  ngAfterViewInit() {
      this.myTree.elementRef.nativeElement.firstChild.style.border = 'none';
      const buttonadd = '<button (click)="" class="btn btn-success btn-round btn-icon btn-sm"' +
                        ' style="position: relative; margin: 4px; float: right;"' +
                        ' title="Add File"><i class="nc-icon nc-simple-add"></i></button>';
      const addtoolbar = document.getElementsByClassName('jqx-grid-toolbar');
      const element = document.createElement('button');
      element.innerHTML = buttonadd;
      element.addEventListener('click', () => {
        window.dispatchEvent(new Event('custom-eventa'));
      });
      addtoolbar[0].parentElement.appendChild(element);
  }
  select(event: any): void {
      this.selectedNodeId = event.args.element.id;
      this.refreshDataTable();
  }

  refreshDataTable() {
    // this.myFileAdd = new FileAddModule();
    if (this.fmAdmin != null) {
      this.fileService.getFiles(this.fmAdmin.id, this.selectedNodeId, 1, 20 ).subscribe(
          (res: PaginatedResult<File[]>) => {
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


  renderedRowButtons(fileService: FileService) {
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

  @HostListener('window:custom-evente', ['$event', ]) onClicke() {
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
    this.myFileAdd.nodeId = this.selectedNodeId;
    this.myFileAdd.fmAdminId = this.fmAdmin.id;
    this.openModal('fileaddmodal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
