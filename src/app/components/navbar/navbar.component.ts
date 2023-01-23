import { Component, OnInit} from '@angular/core';
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

  utente : User[] = [];
  nomeUtente: string;

  nome!:string;
  cognome!: string;
  impiego!: string;
  citta!: string;
  avatar!: string;
  selectedSkills: [];
  recezioneMess: boolean = false;
  id: number

  umano: any;


  constructor(private authSrv:AuthService, private postSrv:PostService, private router:Router) {

  }

  ngOnInit(): void {
   /*  this.increment() */
   this.prendiInfoPersonali()
   console.log(localStorage)
  }

  submit(form: NgForm) {
    let str: string = form.value.nomeUser
    this.nomeUtente= str.charAt(0).toUpperCase() + str.slice(1);
    sessionStorage.setItem('nome', this.nomeUtente)
      this.router.navigate(['/search'])
    }

  prendiInfoPersonali() {
    let x: any = localStorage.getItem('user')
    let y = JSON.parse(x)
    this.nome= y.user.nome
    this.cognome = y.user.cognome
    this.impiego = y.user.impiego
    this.citta = y.user.citta
    this.avatar = y.user.avatar
    this.selectedSkills = y.user.selectedSkills
    this.recezioneMess = y.user.recezioneMess
    this.id = y.user.id
    this.umano = y
    console.log(this.recezioneMess)
      }

  changeStatus() {
    if ( this.recezioneMess === true) {
      this.postSrv.modificaBoolean(this.id, false)
      this.recezioneMess = false
      this.prendiInfoPersonali()
      this.umano.user.recezioneMess = false;
      localStorage.setItem('user', JSON.stringify(this.umano))
    }else{
      return
    }
  }


    /* console.log(this.nomeUtente)
    this.getUtenteFil(this.nomeUtente); */


/*   getUtenteFil(name :string) {
    this.postSrv.getUtenteFiltered(name).subscribe((res) => {
      this.utente = res;
      console.log(this.utente)
      sessionStorage.setItem('nome', name)
      this.router.navigate(['/search'])
    })
  } */

/*   increment() {
    this.postSrv.aumentaNotifiche();
  } */

  esci() {
    this.authSrv.esci()
  }

}

