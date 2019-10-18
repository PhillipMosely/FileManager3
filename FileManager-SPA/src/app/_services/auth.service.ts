import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { LabelAdminComponent } from 'app/labels/labeladmin/labeladmin.component';
import { Label } from '../_models/label';
import { LabelService } from './label.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  fullName = 'user';
  photoUrl = new BehaviorSubject<string>('../../assets/img/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private labelService: LabelService) {}

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
            this.updateCompanyLabels(this.currentUser.companyId);
            if (this.currentUser.photoUrl) {
              this.updateMemberPhoto(this.currentUser.photoUrl);
            }

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

  updateCompanyLabels(companyId: number) {
    this.labelService.getLabelsforCompany(companyId).subscribe( next => {
        if ( next ) {
          localStorage.setItem('labels', JSON.stringify(next.result));
        } else {
          localStorage.setItem('labels', null);
        }
      });
  }
  
  updateMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
}
