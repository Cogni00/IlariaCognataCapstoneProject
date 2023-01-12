import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post/post.service';
import { AuthResponse } from 'src/app/auth/auth-response';
import { ViewChild } from '@angular/core';
import { GetPost, Post } from '../post/post';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent implements OnInit {

  @Input() p!: any

  posts: Post[] = []

  nome!: string;
  cognome!: string;
  id!: number;
  user_id!: number;
  avatar!: string;



  loggedName!: string;
  loggedSurname!: string;
  loggedId!: number;
  loggedAvatar!: string;

  data!: string

  isFav: boolean = false
  preferiti: any

  count:number = 0
  notificationNumberCount:number;

  @ViewChild('user') user!: AuthResponse
  @ViewChild('form') form!: NgForm



  constructor(private postSrv: PostService, private router: Router) { }

  ngOnInit(): void {
    this.getLoggedName()
    this.getName()
    this.getFavorites()
    this.getCommentAvatar()
    this.getPostFav()
    this.increment()
  }


  getName() {
    this.postSrv.prendiNome(this.p.user_id).subscribe(res => {
      let user = res
      this.nome = user.nome
      this.cognome = user.cognome
      this.id = user.id
      this.avatar = user.avatar
    })
  }

  getLoggedName() {
    let a: any = localStorage.getItem('user')
    let b = JSON.parse(a)
    this.loggedName = b.user.nome
    this.loggedSurname = b.user.cognome
    this.loggedId = b.user.id
  }

  getFavorites() {
    this.postSrv.getFav().subscribe((res) => {
      let favorites = res
      let x = favorites.find((f: any) => f.postId == this.p.id)
      if (x) {
        this.isFav = true
        this.count++
        this.preferiti = x
      } else {
        this.isFav = false
      }
    })
  }

  mettiLike(id: number) {
    this.postSrv.like(id).subscribe(res => {
      console.log(res)
      this.isFav = true
      this.getFavorites()
    })
    //this.notificationNumberCount++
  }

  rimuoviLike() {
    this.postSrv.deleteLike(this.preferiti.id).subscribe(res => {
      console.log(res);
    })
    this.isFav = false
    this.count--
  }

  sendComment(form: NgForm, p: Post) {
    let data: GetPost = {
      testo: p.testo,
      commenti: p.commenti,
      date: p.date,
      user_id: p.user_id,
      avatar: p.avatar
    }
    let y = form.value.comment

    if (y) {
      let newComment = {
        comment: y,
        userName: this.loggedName,
        userSurname: this.loggedSurname,
        userAvatar: this.loggedAvatar
      }
      let x = data.commenti.push(newComment)
      this.postSrv.postComment(data, p.id).subscribe((res => {
        console.log(res);
        res
      }))
    } else if (y = '') {
      catchError(err => {
        console.log(err);
        throw err
      })
    }

    form.reset()
  }

  getCommentAvatar() {
    this.postSrv.prendiNome(this.loggedId).subscribe((res) => {
      if (res.avatar) {
        this.loggedAvatar = res.avatar
      } else {
        this.loggedAvatar = this.avatar
    }
  })
}

   getPostFav() {
    this.postSrv.getCountFav(this.p.id).subscribe(res => {
      console.log(res)
    let temp = res
    this.count = temp.length
  })
 }

  increment() {
  this.postSrv.aumentaNotifiche();
 }
}
