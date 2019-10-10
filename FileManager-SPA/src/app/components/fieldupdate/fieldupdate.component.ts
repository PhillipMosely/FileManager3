import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'app/_models/field';

@Component({
  selector: 'app-fieldupdate',
  templateUrl: './fieldupdate.component.html',
  styleUrls: ['./fieldupdate.component.css']
})
export class FieldUpdateComponent implements OnInit {
  @Input() myId: number;
  @Input() myType: string;
  @Input() myTitle: string;
  @Input() myFields: Field[]; // Field,Value,Type,Width

  constructor() {
    if (!this.myType) {
      this.myType = 'Text';
    }
    if (!this.myTitle) {
      this.myTitle = '';
    }
    if (!this.myFields) {
      this.myFields = [];
    }
  }

  ngOnInit() {
  }

}
