import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileManagerAdmin } from '../_models/filemanageradmin';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileManagerAdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getFMAdmins(page?, itemsPerPage?): Observable<PaginatedResult<FileManagerAdmin[]>> {
    const paginatedResult: PaginatedResult<FileManagerAdmin[]> = new PaginatedResult<FileManagerAdmin[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<FileManagerAdmin[]>(this.baseUrl + 'fmadmins', { observe: 'response', params})
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

  getFMAdminForUserId(id): Observable<FileManagerAdmin> {
    return this.http.get<FileManagerAdmin>(this.baseUrl + 'fmadmins/getforuserid/' + id);
  }

  getFMAdmin(id): Observable<FileManagerAdmin> {
    return this.http.get<FileManagerAdmin>(this.baseUrl + 'fmadmins/' + id);
  }
  updateFMAdmin(id: number, fmAdmin: FileManagerAdmin) {
    return this.http.put(this.baseUrl + 'fmadmins/' + id, fmAdmin);
  }

}
