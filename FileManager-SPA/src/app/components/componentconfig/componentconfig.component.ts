import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';

@Component({
  selector: 'app-componentconfig',
  templateUrl: './componentconfig.component.html',
  styleUrls: ['./componentconfig.component.css']
})
export class ComponentConfigComponent implements AfterViewInit, OnInit {
  @Input() componentConfigSetup: any;
  @Input() componentName: string;
  @ViewChild('myCCTree', {static: false}) myCCTree: jqxTreeComponent;

  selectedNodeId = -1;
  source: any[] ;
  dataAdapter: any;
  records: any[];
  
  constructor() { }

  ngOnInit() {
    this.source = this.componentConfigSetup;
    this.componentConfigSetup.push({ id: '0', parentid: '-1', label: this.componentName });
    this.dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
    this.records = this.dataAdapter.getRecordsHierarchy('id', 'parentid');
  }

  ngAfterViewInit() {
    this.myCCTree.expandItem(document.getElementById('0'));
    this.myCCTree.refresh();
  }
 
}
