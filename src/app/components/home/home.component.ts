import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Articles, News, Post, Data } from '../post/post';
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


  content!: any;
  form: NgForm

  utente : User[] = []
  nomeUtente: string;

  /* articles!: Articles[]; */
  data!: Data[];
  title: string
  url: string
  image: string
  description:string
  published_at: string

  constructor(private authSrv: AuthService, private modalService: MdbModalService, private postSrv:PostService, private router:Router) {
  }

  ngOnInit(): void {
    this.prendiPost();
    this.prendiInfoPersonali();
    /* this.prendiNews(); */

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

/*  prendiNews() {
    this.postSrv.getNews().subscribe((res) => {
      console.log(res.data)
      this.data = res.data
      this.data.forEach(el => {
        console.log(el);
        })
      })
 } */


  esci() {
    this.authSrv.esci()
  }

  }




