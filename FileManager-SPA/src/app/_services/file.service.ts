import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getFiles(fmAdminId: number, nodeId: number, page?, itemsPerPage?): Observable<PaginatedResult<File[]>> {
    const paginatedResult: PaginatedResult<File[]> = new PaginatedResult<File[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<File[]>(this.baseUrl + 'files/' + fmAdminId + '/' + nodeId, { observe: 'response', params})
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

  getFile(id): Observable<File> {
    return this.http.get<File>(this.baseUrl + 'files/' + id);
  }
  updateFile(id: number, file: File) {
    return this.http.put(this.baseUrl + 'files/' + id, file);
  }
  deleteFile(id: number) {
    return this.http.delete(this.baseUrl + 'files/' + id);
  }

  addFile(file: File) {
    return this.http.post(this.baseUrl + 'files/', file)
  }

}
