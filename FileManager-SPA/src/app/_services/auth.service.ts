import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  fullName = 'user';

  constructor(private http: HttpClient) {}

  changeMemberFullName(user: User) {
    this.fullName = (user.firstName + ' ' + user.lastName);
  }

  login(model: any) {
    return this.http
      .post(this.baseurl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
            this.changeMemberFullName(this.currentUser);

          }
      })
    );
  }

  register(user: User, subfolder: string) {
    return this.http.post(this.baseurl + 'register/' + subfolder, user);
  }

  LoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  updateUserInfo(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
    this.changeMemberFullName(this.currentUser);
  }
}
