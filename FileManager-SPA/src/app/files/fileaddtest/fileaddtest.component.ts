import { Component, OnInit} from '@angular/core';

import { SweetAlertService } from 'app/_services/sweetalert.service';

@Component({
  selector: 'app-fileaddtest',
  templateUrl: './fileaddtest.component.html',
  styleUrls: ['./fileaddtest.component.css']
})

export class FileAddTestComponent implements OnInit {
  constructor(private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
  }

}
