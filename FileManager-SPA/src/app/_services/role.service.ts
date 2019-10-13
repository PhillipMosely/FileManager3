import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Role } from 'app/_models/role';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getRoles(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult<Role[]>> {
    const paginatedResult: PaginatedResult<Role[]> = new PaginatedResult<Role[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Role[]>(this.baseUrl + 'roles', { observe: 'response', params})
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

  getRole(id): Observable<Role> {
    return this.http.get<Role>(this.baseUrl + 'roles/' + id);
  }

  updateRole(id: number, role: Role) {
    return this.http.put(this.baseUrl + 'roles/' + id, role);
  }

  deleteRole(id: number) {
    return this.http.delete(this.baseUrl + 'roles/' + id);
  }

  addRole(role: Role) {
    return this.http.post(this.baseUrl + 'roles/', role)
  }

}
