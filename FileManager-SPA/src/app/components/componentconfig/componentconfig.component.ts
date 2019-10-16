import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';
import { jqxSplitterComponent} from 'jqwidgets-ng/jqxsplitter';

@Component({
  selector: 'app-componentconfig',
  templateUrl: './componentconfig.component.html',
  styleUrls: ['./componentconfig.component.css']
})
export class ComponentConfigComponent implements AfterViewInit, OnInit {
  @Input() componentConfigSetup: any;
  @Input() componentName: string;
  @ViewChild('myCCTree', {static: false}) myCCTree: jqxTreeComponent;
  @ViewChild('myDTTree', {static: false}) myDTTree: jqxTreeComponent;
  @ViewChild('myCCSplitter ', {static: false}) myCCSplitter: jqxSplitterComponent;

  selectedNodeId = -1;
  source: any[] ;
  dataAdapter: any;
  records: any[];
  dataTableRecords: any[];
  dataTableConfigVisible = false;
  
  constructor() { }

  ngOnInit() {
    this.source = this.componentConfigSetup;
    this.source.push({ id: '0', parentid: '-1', label: this.componentName });
    this.dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
    this.records = this.dataAdapter.getRecordsHierarchy('id', 'parentid');
  }

  ngAfterViewInit() {
    this.myCCTree.expandItem(document.getElementById('0'));
    this.myCCTree.refresh();
    this.myDTTree.refresh();
  }
 
  componentSelected(event: any): void {
    this.dataTableRecords = {} as any[];
    this.dataTableConfigVisible = false;
    this.selectedNodeId = +event.args.element.id;
    if (this.selectedNodeId === 1) {
      this.dataTableRecords = [{ id: '1', parentid: '0', label: 'Column 1' }];
      this.dataTableRecords.push({ id: '1', parentid: '0', label: 'Column 3' });
      this.dataTableConfigVisible = true;
      this.myDTTree.refresh();

    }
  }
}
