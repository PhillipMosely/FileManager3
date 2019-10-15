import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Role } from 'app/_models/role';
import { Label } from 'app/_models/label';


@Injectable({
  providedIn: 'root'
})
export class LabelService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getLabels(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<Label[]>> {
    const paginatedResult: PaginatedResult<Label[]> = new PaginatedResult<Label[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Label[]>(this.baseUrl + 'labels', { observe: 'response', params})
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

  getLabelsforCompany(companyId: number, page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<Label[]>> {
    const paginatedResult: PaginatedResult<Label[]> = new PaginatedResult<Label[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Label[]>(this.baseUrl + 'labels/forcompany' + companyId, { observe: 'response', params})
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

  getLabel(id): Observable<Role> {
    return this.http.get<Role>(this.baseUrl + 'labels/' + id);
  }

  updateLabel(id: number, label: Label) {
    return this.http.put(this.baseUrl + 'labels/' + id, label);
  }


}
