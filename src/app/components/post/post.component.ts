import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { GetPost } from './post';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  user_id!: number;
  newDate!: {}
  @Input() p!: any

  constructor(private postSrv: PostService, private router:Router) { }

  ngOnInit(): void {
  }

  inviaPost(form: NgForm){
    this.getDate()
    this.getUserId()
    let data: GetPost = {
      user_id: this.user_id,
      testo: form.value.testo,
      commenti: [],
      avatar: form.value.avatar,
      date: this.newDate

    }

    this.postSrv.creaPost(data).pipe(catchError(err => {
      console.log(err);
      throw err
    })).subscribe(res => {
      console.log(res);
      window.location.reload()
    })

  }

  getDate() {
    let date = new Date()
    let m = date.getMonth()
    let d = date.getDate()
    let h = date.getHours()
    let mi = date.getMinutes()
    let orario = {
      mese: m,
      giorno: d,
      ora: h,
      minuti: mi
    }
    this.newDate = orario
  }


  getUserId(){
    let x: any = localStorage.getItem('user')
    let y = JSON.parse(x)
    this.user_id = y.user.id
  }
}

