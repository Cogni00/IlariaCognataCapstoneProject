import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post/post';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PostComponent } from '../post/post.component';
import { PostService } from '../post/post.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/auth-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: MdbModalRef<PostComponent> | null = null;

  posts: Post[] = []
  nome!: string;
  cognome!: string;
  impiego!: string;
  citta!: string;
  avatar!: string;

  notificationNumberCount:number;
  content!: any;
  form: NgForm

  utente : User[] = []
  nomeUtente: string;


   /*
   Frontend: y.user.impiego == 'Frontend Developer';
    Backend: y.user.impiego === 'Backend Developer'
     Fullstack: y.user.impiego === 'Fullstack Developer'
  */



  constructor(private authSrv: AuthService, private modalService: MdbModalService, private postSrv:PostService, private router:Router) {
  }

  ngOnInit(): void {
    this.prendiPost();
    this.prendiInfoPersonali();
   // this.increment();

  }

  openInputText() {
    this.modalRef= this.modalService.open(PostComponent)
  }

  prendiInfoPersonali() {
    let x: any = localStorage.getItem('user')
    let y = JSON.parse(x)
    this.nome= y.user.nome
    this.cognome = y.user.cognome
    this.impiego = y.user.impiego
    this.citta = y.user.citta
    this.avatar = y.user.avatar
    console.log(this.impiego)
  }

  prendiPost() {
    this.postSrv.prendiPost().subscribe((res) => {
      this.posts = res.reverse()
      console.log(this);
    })
  }

  esci() {
    this.authSrv.esci()
  }

 /*  increment() {
    this.notificationNumberCount++
  } */
  }




