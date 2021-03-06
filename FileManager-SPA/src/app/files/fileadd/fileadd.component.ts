import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { APIFile } from '../../_models/file';
import { environment } from '../../../environments/environment';
import { SweetAlertService } from 'app/_services/sweetalert.service';

@Component({
  selector: 'app-fileadd',
  templateUrl: './fileadd.component.html',
  styleUrls: ['./fileadd.component.css']
})

export class FileAddComponent implements OnInit {
  @Input() fmAdminId: number;
  @Input() nodeId: number;
  @Output() getFileChange = new EventEmitter<string>();
  public uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: File;

  constructor(private sweetAlertService: SweetAlertService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'files/' + this.fmAdminId + '/' + this.nodeId,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image', 'pdf', 'compress', 'doc', 'xls', 'ppt', 'psd', 'txt', 'xlsx'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onBeforeUploadItem = (file) => {file.url = this.baseUrl + 'files/' + this.fmAdminId + '/' + this.nodeId };
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: APIFile = JSON.parse(response);
        const file = {
          fileName: res.fileName,
          fileManagerAdminId: res.fileManagerAdminId,
          nodeId: res.nodeId
        };
        // this.files.push(file);
      }
    };
  }

  
}