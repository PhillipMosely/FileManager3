import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { jqxSplitterComponent} from 'jqwidgets-ng/jqxsplitter';
import { SweetAlertService } from 'app/_services/sweetalert.service';

@Component({
  selector: 'app-componentconfig',
  templateUrl: './componentconfig.component.html',
  styleUrls: ['./componentconfig.component.css']
})
export class ComponentConfigComponent implements AfterViewInit, OnInit {
  @Input() componentConfigSetup: any;
  @Input() componentName: string;
  @Output() closeEventConfig = new EventEmitter<string>(); 
  @ViewChild('myCCTree', {static: false}) myCCTree: jqxTreeComponent;
  @ViewChild('myCCSplitter ', {static: false}) myCCSplitter: jqxSplitterComponent;

  selectedNodeId = -1;
  source: any[] ;
  dataAdapter: any;
  records: any[];
  dataTableRecords: any[];
  dataTableConfigVisible = false;
  buttonConfigVisible = false;
  filterConfigVisible = false;
  
  constructor(private sweetAlertService: SweetAlertService) { }

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
  }

  ngAfterViewInit() {
    this.myCCTree.expandItem(document.getElementById('0'));
    this.myCCTree.refresh();
   }
 
  componentSelected(event: any): void {
    this.dataTableRecords = [];
    this.dataTableConfigVisible = false;
    this.buttonConfigVisible = false;
    this.filterConfigVisible = false;
    this.selectedNodeId = +event.args.element.id;
    switch (this.componentConfigSetup[this.selectedNodeId - 1].type) {
      case 'table': {
        this.dataTableConfigVisible = true;
        const myColumns = this.componentConfigSetup[this.selectedNodeId - 1].tablecolumns;
        for (let i = 0; i < myColumns.length; i++) {
          this.dataTableRecords.push({id: i, name: myColumns[i].text});
        };
        break;
      }
      case 'filter': {
        this.filterConfigVisible = true;
        break;

      }
      case 'button': {
        this.buttonConfigVisible = true;
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

  saveConfig() {

  }

  cancelConfig() {
    this.closeEventConfig.emit('done');
  }
}
