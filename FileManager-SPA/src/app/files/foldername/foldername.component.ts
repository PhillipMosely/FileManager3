import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foldername',
  templateUrl: './foldername.component.html',
  styleUrls: ['./foldername.component.css']
})
export class FolderNameComponent implements OnInit {
  @Input() folder: string;
  @Input() id: string;
  @Input() addMode: boolean;
  constructor() { }

  ngOnInit() {
  }

}
