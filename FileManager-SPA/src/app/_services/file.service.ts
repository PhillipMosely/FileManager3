import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { APIFile } from '../_models/file';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getFiles(fmAdminId: number, nodeId: number, page?, itemsPerPage?): Observable<PaginatedResult<APIFile[]>> {
    const paginatedResult: PaginatedResult<APIFile[]> = new PaginatedResult<APIFile[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<APIFile[]>(this.baseUrl + 'files/' + fmAdminId + '/' + nodeId, { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getFile(id): Observable<APIFile> {
    return this.http.get<APIFile>(this.baseUrl + 'files/' + id);
  }
  updateFile(id: number, file: APIFile) {
    return this.http.put(this.baseUrl + 'files/' + id, file);
  }
  deleteFile(id: number) {
    return this.http.delete(this.baseUrl + 'files/' + id);
  }

  addFile(file: File) {
    return this.http.post(this.baseUrl + 'files/', file)
  }

  deleteFilesforFMNode(fmAdminId: number, nodeId: number) {
    return this.http.delete(this.baseUrl + 'files/' + fmAdminId + '/' + nodeId);
  }

  // deleteFileforFM(fmAdminId: number, nodeId: number) {
  //   return this.http.delete(this.baseUrl + 'files/' + fmAdminId + '/' + nodeId);
  // }
}
