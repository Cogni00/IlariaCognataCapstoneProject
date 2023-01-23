import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { LoginRequest } from 'src/app/auth/auth-response';
import { catchError } from 'rxjs';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  err: string | undefined
  @ViewChild('l', {static: true}) l!: NgForm;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    // se il boolean di lorenzo è true, ng style con badge rosso
  }

  login (l: NgForm) {
    let data: LoginRequest = {
      email: l.value.email,
      password: l.value.password
      //devo dire alla navbar che quando l'utente loggato ha true come valore di recezioneMess, fa apparire pallino rosso( vedi visible e hidden)
    }
    this.authSrv.accedi(data).pipe(catchError(err => {
      if (err.error == "Cannot find user") {
        this.err = 'Utente non registrato'
        } else if (err.error == "Incorrect password") {
          this.err = 'Utente non registrato'
        } else if (err.error == "Email format is invalid") {
          this.err = 'Formato email errto'
        }
        throw err
      })).subscribe(res => {
        this.router.navigate(['/home'])
      })

    }
  }

