import { Component, OnInit, Input } from '@angular/core';
import { APIFile } from '../../_models/file';

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

}
