import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { File } from '../../_models/file';
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
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: File;

  constructor(private sweetAlertService: SweetAlertService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'files/',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        // const res: File = JSON.parse(response);
        // const file = {
        //   id: res.id,
        //   fileName: res.fileName,
        //   ext: res.ext,
        //   url: res.url,
        //   description: res.description,
        //   size: res.size,
        //   dateCreated: res.dateCreated,
        //   dateModified: res.dateModified,
        //   fileManagerAdminId: res.fileManagerAdminId,
        //   nodeId: res.nodeId
        // };
        // this.files.push(file);
      }
    };
  }
}