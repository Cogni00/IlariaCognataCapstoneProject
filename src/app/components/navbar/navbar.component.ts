import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/auth-response';
import { NgForm } from '@angular/forms';
import { PostService } from '../post/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() persona= ''
  notificationNumberCount:number;
  utente : User[] = [];
  nomeUtente: string;

  constructor(private authSrv:AuthService, private postSrv:PostService, private router:Router) {}

  ngOnInit(): void {
    this.increment()
  }

  submit(form: NgForm) {
    let str: string = form.value.nomeUser
    this.nomeUtente= str.charAt(0).toUpperCase() + str.slice(1);
    sessionStorage.setItem('nome', this.nomeUtente)
      this.router.navigate(['/search'])

    /* console.log(this.nomeUtente)
    this.getUtenteFil(this.nomeUtente); */
   }

/*   getUtenteFil(name :string) {
    this.postSrv.getUtenteFiltered(name).subscribe((res) => {
      this.utente = res;
      console.log(this.utente)
      sessionStorage.setItem('nome', name)
      this.router.navigate(['/search'])
    })
  } */

  increment() {
    this.postSrv.aumentaNotifiche();
  }

  esci() {
    this.authSrv.esci()
  }

}
