import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { jqxTreeComponent } from 'jqwidgets-ng/jqxtree';

@Component({
  selector: 'app-componentconfig',
  templateUrl: './componentconfig.component.html',
  styleUrls: ['./componentconfig.component.css']
})
export class ComponentConfigComponent implements OnInit {
  @Input() componentConfigSetup: any;
  @Input() componentName: string;
  @ViewChild('myCCTree', {static: false}) myCCTree: jqxTreeComponent;

  selectedNodeId = -1;
  source: any;
  dataAdapter: any;
  records: any;
  constructor() { }

  ngOnInit() {
    debugger;
    this.componentConfigSetup.push({ 'id': '0', 'parentid': '-1', 'text': this.componentName, 'type': ''  });
    this.source = {
        datatype: 'json',
        datafields: [
            { name: 'id' },
            { name: 'parentid' },
            { name: 'text' },
            { name: 'type' }
        ],
        id: 'id',
        localdata: this.componentConfigSetup
        };
      this.dataAdapter = new jqx.dataAdapter(this.source, { autoBind: true });
      this.records = this.dataAdapter.getRecordsHierarchy('id', 'parentid', [{ name: 'text', map: 'label' }]);
      this.myCCTree.source(this.records);
      this.myCCTree.expandItem(document.getElementById('0'));
      this.myCCTree.refresh();
  }

  select(event) {
    
  }
}
