import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { jqxDataTableComponent } from 'jqwidgets-ng/jqxdatatable';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons'; 
import { ActivatedRoute } from '@angular/router';
import { FileManagerAdmin } from 'app/_models/filemanageradmin';
import { FileManagerAdminService } from 'app/_services/filemanageradmin.service';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { FileService } from 'app/_services/file.service';
import { PaginatedResult } from 'app/_models/Pagination';
import { ModalService } from 'app/_services/modal.service';
import { FileAddComponent } from '../fileadd/fileadd.component';


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
  @ViewChild('myFileAdd', {static: false}) myFileAdd: FileAddComponent;

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
        const buttonedit = '<button (click)="" id="edit' + row + '" class="btn btn-primary btn-link btn-icon edit rowedit"' +
                         ' title="Edit File"><i class="fa fa-edit"></i></button>';
        const buttondel = '<button (click)="" id="del' + row + '" class="btn btn-warning btn-link btn-icon remove rowdelete"' +
                         ' title="Delete File"><i class="fa fa-times"></i></button>';
        const item = '<div>' + buttonedit + buttondel + '</div>';

        return item;
      }},
      { text: 'File Name', cellsAlign: 'left', align: 'left', dataField: 'fileName', width: 300 },
      { text: 'Size (kb)', dataField: 'size', cellsFormat: 'd', cellsAlign: 'center', align: 'center', width: 120 },
      { text: 'Date Modified', cellsAlign: 'center', align: 'center', datafield: 'dateModified', width: 120, cellsFormat: 'd' },
      { text: 'Ext', cellsAlign: 'center', align: 'center', dataField: 'ext', width: 120 },
      { text: 'URL', cellsAlign: 'left', align: 'left', dataField: 'url', width: 300 }
  ];

  constructor(private route: ActivatedRoute,
              private fileManagerAdminService: FileManagerAdminService,
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
                        { name: 'dateCreated', type: 'date' },
                        { name: 'dateModified', type: 'date' },
                        { name: 'description', type: 'string' }
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
            window.dispatchEvent(new Event('custom-evente'));
        });
    }

    const delbuttons = document.getElementsByClassName('rowdelete');
    for (let i = 0; i < delbuttons.length; i++) {
        delbuttons[i].addEventListener('click', () => {
            window.dispatchEvent(new Event('custom-eventd'));
        });
    }
  };
  @HostListener('window:custom-evente', ['$event']) onClicke() {
    this.sweetAlertService.message('clicked e');
  }
  @HostListener('window:custom-eventd', ['$event']) onClickd() {
    this.sweetAlertService.message('clicked d');
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
