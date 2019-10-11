import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Company } from 'app/_models/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getCompanys(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<Company[]>> {
    const paginatedResult: PaginatedResult<Company[]> = new PaginatedResult<Company[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Company[]>(this.baseUrl + 'companys', { observe: 'response', params})
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

  getCompany(id): Observable<Company> {
    return this.http.get<Company>(this.baseUrl + 'companys/' + id);
  }

  updateCompany(id: number, company: Company) {
    return this.http.put(this.baseUrl + 'companys/' + id, company);
  }

  deleteCompany(id: number) {
    return this.http.delete(this.baseUrl + 'companys/' + id);
  }

  addCompany(company: Company) {
    return this.http.post(this.baseUrl + 'companys/', company)
  }

}
