import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { jqxSplitterComponent} from 'jqwidgets-ng/jqxsplitter';
import { SweetAlertService } from 'app/_services/sweetalert.service';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { CompanyService } from 'app/_services/company.service';
import { UserService } from 'app/_services/user.service';
import { Utilities } from 'app/_helpers/utilities';

@Component({
  selector: 'app-componentconfig',
  templateUrl: './componentconfig.component.html',
  styleUrls: ['./componentconfig.component.css']
})
export class ComponentConfigComponent implements AfterViewInit, OnInit {
  @Input() componentConfigSetup: any;
  @Input() configuredColumns: any;
  @Input() componentName: string;
  @Input() componentModel: string;
  @Input() companyId: number;
  @Output() closeEventConfig = new EventEmitter<string>(); 
  @ViewChild('myCCTree', {static: false}) myCCTree: jqxTreeComponent;
  @ViewChild('myCCSplitter ', {static: false}) myCCSplitter: jqxSplitterComponent;
  @ViewChild('myColumnSort', {static: false}) myColumnSort: SortableModule;

  selectedNodeId = -1;
  source: any[] ;
  dataAdapter: any;
  records: any[];
  dataTableRecords: any[];
  dataTableColumnsAfterSort: any;

  constructor(private sweetAlertService: SweetAlertService,
              private companyService: CompanyService,
              private userService: UserService) { }

  ngOnInit() {

    this.source = [];
    this.source.push({ id: '0', parentid: '-1', label: this.componentName });
    let myId = 0;
    this.componentConfigSetup.forEach(element => {
      myId++;
      this.source.push({id: myId.toString(), parentid: '0', label: element.label});
    });
    this.dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
    this.records = this.dataAdapter.getRecordsHierarchy('id', 'parentid');

    this.configureCompnents();

  }

  ngAfterViewInit() {
    this.myCCTree.expandItem(document.getElementById('0'));
    this.myCCTree.refresh();
  }
 
  configureCompnents() {
    this.dataTableRecords = [];
    const myColumns = this.componentConfigSetup[0].tablecolumns;
    for (let i = 0; i < myColumns.length; i++) {
      this.dataTableRecords.push({id: i, model: myColumns[i].model, name: myColumns[i].text, visible: true});
    };
    this.companyService.getCompany(this.companyId).subscribe( next => {
      this.dataTableRecords = Utilities.columnsForConfig(this.componentModel, this.dataTableRecords,
                                                        next.componentConfig);

      let myDiv = document.getElementsByClassName('addbuttonconfig');
      let myCheckbox = <any>myDiv[0].getElementsByTagName('input');
      myCheckbox[0].checked = Utilities.itemVisibleForConfig(this.componentModel, 'addbutton', next.componentConfig)

      myDiv = document.getElementsByClassName('filterconfig');
      myCheckbox = <any>myDiv[0].getElementsByTagName('input');
      myCheckbox[0].checked = Utilities.itemVisibleForConfig(this.componentModel, 'filter', next.componentConfig)

    });
  }


  componentSelected(event: any): void {
    this.resetComponents();
    this.selectedNodeId = +event.args.element.id;
    switch (this.componentConfigSetup[this.selectedNodeId - 1].type) {
      case 'table': {
        const myDataTable = <any>document.getElementsByClassName('datatableconfig');
        myDataTable[0].hidden = false;
        break;
      }
      case 'filter': {
        const myFilter = <any>document.getElementsByClassName('filterconfig');
        myFilter[0].hidden = false;
        break;
      }
      case 'button': {
        const myAddButton = <any>document.getElementsByClassName('addbuttonconfig');
        myAddButton[0].hidden = false;
        break;
      }
      default: {
        break;
      }
    }
  }

  myColumnConfigOnClick(event: any): void {
    this.sweetAlertService.message('Column Configuration coming soon!')
  }

  onSortChange(event: any): void {
    this.dataTableColumnsAfterSort = [];
    event.forEach(element => {
        this.dataTableColumnsAfterSort.push({id: element.id, model: element.model,
                                            name: element.text, visible: element.visible});
    });

  }

  itemChecked(index: number): boolean {
    return this.dataTableRecords[index].visible;
  }

  saveConfig() {
    let datatable: any;
    let addbutton: any;
    let filter: any;
    this.componentConfigSetup.forEach(element => {
      switch (element.type) {
        case 'table': {
          const myDiv = document.getElementsByClassName('sortable-item');
          for (let i = 0; i < this.dataTableColumnsAfterSort.length; i++ ) {
            const myCheckbox = <any>myDiv[i].getElementsByTagName('input');
            this.dataTableColumnsAfterSort[i].visible = myCheckbox[0].checked;
          }
          datatable = {columns: JSON.stringify(this.dataTableColumnsAfterSort)};
          break;
        }
        case 'filter': {
          const myDiv = document.getElementsByClassName('filterconfig');
          const myCheckbox = <any>myDiv[0].getElementsByTagName('input');
          filter = {filter: {visible: myCheckbox[0].checked}};
          break;
        }
        case 'button': {
          const myDiv = document.getElementsByClassName('addbuttonconfig');
          const myCheckbox = <any>myDiv[0].getElementsByTagName('input');
          addbutton = {addbutton: {visible: myCheckbox[0].checked}};
        break;
        }
        default: {
          break;
        }
      }
    });

    const componentconfig = {datatable: datatable, addbutton: addbutton, filter: filter};
    const myComponent: any[] = [{componentmodel: this.componentModel, componentconfig}]
    this.companyService.getCompany(this.companyId).subscribe( next => {
      next.componentConfig = JSON.stringify(myComponent);
      this.companyService.updateCompany(this.companyId, next).subscribe( next2 => {
        this.sweetAlertService.message('Successfully updated company configuration');
        this.resetComponents();
        this.closeEventConfig.emit('save');
      }, error2 => {
        this.sweetAlertService.error('Error updating company configuration');
      })
    }, error => {
      this.sweetAlertService.error('Error retrieving company for configuration update');
    });
  }

  cancelConfig() {
    this.resetComponents();
    this.closeEventConfig.emit('cancel');
  }

  resetComponents() {
    const myFilter = <any>document.getElementsByClassName('filterconfig');
    const myAddButton = <any>document.getElementsByClassName('addbuttonconfig');
    const myDataTable = <any>document.getElementsByClassName('datatableconfig');
    myFilter[0].hidden = true;
    myAddButton[0].hidden = true;
    myDataTable[0].hidden = true;
  }
}
