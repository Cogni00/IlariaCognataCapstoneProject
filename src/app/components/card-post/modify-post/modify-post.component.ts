import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../../post/post';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {

  @Input() p!: any

  @ViewChild('form') form!: NgForm

  newPost : Post;




  constructor(private postSrv: PostService, private router:Router) {
  }

  ngOnInit(): void {
    this.cambioPost();
  }



   cambioPost() {
   let post = localStorage.getItem("cambiaPost");
   this.newPost = JSON.parse(post);
   }



   inviaModificato(form: NgForm) {
      let data: Post = {
        id: this.newPost.id,
        user_id: this.newPost.user_id,
        testo: form.value.newTesto,
        commenti: this.newPost.commenti,
        avatar: this.newPost.avatar,
        date: this.newPost.date
      }
      console.log(data);
      this.postSrv.modificaPost(data, this.newPost.id).subscribe((res =>{
        res;
        console.log(res);
        localStorage.removeItem("cambiaPost")
        window.location.reload()
      }))
   }
}
