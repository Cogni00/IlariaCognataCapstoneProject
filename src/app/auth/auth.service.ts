import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  private authSubj = new BehaviorSubject<null | AuthResponse>(null);

  user$ = this.authSubj.asObservable();

  constructor( private http: HttpClient, private router: Router) {
    this.ripristina();
   }

  usersUrl = 'http://localhost:4201/register';
  loginUrl = 'http://localhost:4201/login'

registrati(data: RegisterRequest) {
  return this.http.post<AuthResponse>(this.usersUrl, data).pipe(catchError(err=> {
    console.log(err);
  throw err;
  }));
}

accedi(data: LoginRequest){
  return this.http.post<AuthResponse>(this.loginUrl, data).pipe(catchError(err => {
    throw err
  }), tap((res) => {
    this.authSubj.next(res);
    localStorage.setItem('user', JSON.stringify(res));
  }));
}

ripristina() {
  const user = localStorage.getItem('user');
  if (!user){
    return;
  }
   const userData: AuthResponse = JSON.parse(user);
   if(this.jwtHelper.isTokenExpired(userData.accessToken)) {
    return;
   }
   this.authSubj.next(userData);

}

/* prendiAvatar(data: Avatars) {
  return this.http.get<Avatars>('http://localhost:4201/avatars')
} */

esci() {
  this.authSubj.next(null)
  localStorage.removeItem('user');
  this.router.navigate(['/login'])
}
}
