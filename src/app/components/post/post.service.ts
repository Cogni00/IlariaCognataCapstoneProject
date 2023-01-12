import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetPost, Post, Like, GetSkills } from './post';
import { catchError, tap } from 'rxjs';
import { User } from 'src/app/auth/auth-response';
import { Messaggi } from './post';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {

@Output() change: EventEmitter<string[]> = new EventEmitter()


 postUrl='https://63ac1e4234c46cd7ae77e3ae.mockapi.io/posts'
 likeUrl='https://63ac1e4234c46cd7ae77e3ae.mockapi.io/Like'
 skillsUrl='https://63ac1e4234c46cd7ae77e3ae.mockapi.io/skills'
 chatUrl='https://63ac1e4234c46cd7ae77e3ae.mockapi.io/chat'

 utenteFiltrato:any;

 notificationNumberCount : number;

  constructor(private http: HttpClient, private router:Router) { }


  sendData(data: string[]): any {
    this.change.emit(data);
  }


  creaPost(data: GetPost) {
  return this.http.post<GetPost>(this.postUrl, data).pipe(catchError(err => {
    console.log(err);
    throw err
  }))
  }

  prendiPost(){
    return this.http.get<Post[]>(this.postUrl).pipe(catchError(err =>{
      console.log(err);
      throw err
    }))
  }

  prendiNome(id: number) {
    return this.http.get<User>('http://localhost:4201/users/'+id )
  }

  prendiUtentiChat( ) {
    return this.http.get<User[]>('http://localhost:4201/users/').pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }


  prendiPostDaId() {
    let takePost: any = localStorage.getItem('user')
    let post = JSON.parse(takePost)
    let pId = post.user.id
    console.log(pId);
    return this.http.get<Post[]>(this.postUrl +`?user_id=${pId}`).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }


  like(id: number) {
    let takeUser: any = localStorage.getItem('user')
    let user = JSON.parse(takeUser)
    let uId = user.user.id

    let newLike: Like = {
      postId: id,
      userId: uId
    }
    return this.http.post<Like>( this.likeUrl, newLike).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
    //this.notificationNumberCount++
  }

  deleteLike(id: number) {
    return this.http.delete(this.likeUrl+`/ ${id}`)
  }

  getFav() {
    let takeUser: any = localStorage.getItem('user')
    let user = JSON.parse(takeUser)
    let uId = user.user.id

    return this.http.get<Like[]>(this.likeUrl +`?userId=${uId}`).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  postComment(data: GetPost, id: number) {
    return this.http.put<GetPost>(this.postUrl +`/${id}`, data).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  getCountFav(id: number) {
    return this.http.get<Like[]>(this.likeUrl+`?postId=${id}`).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  getUtenteFiltered(id: string) {
      return this.http.get<User[]>(`http://localhost:4201/users?nome=${id}`).pipe(catchError((err)=>{
        throw new Error("persona non trovata")
      }))/* .subscribe(res => {
        this.utenteFiltrato = res
        this.router.navigate(['/search'])
      }) */
  }

  cercaUtente() {
    return this.utenteFiltrato
  }


  sendMessage(data: any) {
    return this.http.post(this.chatUrl, data).pipe(catchError(err => {
      console.log(err);
      throw err
    }))

  }

  recieveMessagge(senderId: number, receiverId:number) {
    return this.http.get(this.chatUrl).pipe(catchError(err => {
      console.log(err);
      throw err
    } ))
  }

  aumentaNotifiche() {
    this.notificationNumberCount++
  }

  modificaBoolean() {
    //fai una fetch, metti nel body che recezioneMess:true e l'id che passi è l'id del ricevente su cui lui deve fare la patch
  }
}



