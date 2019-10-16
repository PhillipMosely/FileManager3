import { Component, OnInit, Input } from '@angular/core';
import { APIFile } from '../../_models/file';
import { Utilities } from 'app/_helpers/utilities';

@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.css']
})
export class FileViewComponent implements OnInit {
  @Input() myFile: APIFile;

  constructor() {}

  ngOnInit() {
  }

  getLabel(modelName: string) {
    return Utilities.labelforModelName(modelName);
  }
}
