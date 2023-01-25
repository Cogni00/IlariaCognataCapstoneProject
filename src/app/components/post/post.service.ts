import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetPost, Post, Like, GetSkills, News, Notizie } from './post';
import { catchError, merge, mergeScan, tap } from 'rxjs';
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
 chatUrl='https://63ac1e4234c46cd7ae77e3ae.mockapi.io/chat'
 /* newsApiUrls='https://api.thenewsapi.com/v1/news/top?language=it&locale=it&api_token=pi3eluaXtdAVr33gGUxef9fNGowEcOtATPwqadg4' */

 utenteFiltrato:any;

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
    return this.http.get<User[]>('http://localhost:4201/users').pipe(catchError(err => {
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
    return this.http.post<Like>(this.likeUrl, newLike).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  deleteLike(id: number) {
    return this.http.delete(this.likeUrl+`/${id}`)
  }

  eliminaPost(id: number) {
    return this.http.delete(this.postUrl+`/${id}`)
  }

  postComment(data: GetPost, id: number) {
    return this.http.put<GetPost>(this.postUrl +`/${id}`, data).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  modificaPost(data: GetPost, id: number) {
    return this.http.put<GetPost>(this.postUrl+`/${id}`, data).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
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

  getCountFav(id: number) {
    return this.http.get<Like[]>(this.likeUrl+`?postId=${id}`).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
  }

  getUtenteFiltered(id: string) {
      return this.http.get<User[]>(`http://localhost:4201/users?nome=${id}`).pipe(catchError((err)=>{
        throw new Error("persona non trovata")
      }))
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

  recieveMessagge() {
    return this.http.get(this.chatUrl).pipe(catchError(err => {
      console.log(err);
      throw err
    } ))
  }

  modificaBoolean(receiverId:number, recezioneMess:boolean) {
    const url = `http://localhost:4201/users/${receiverId}`
    const body = { recezioneMess : recezioneMess }
    return this.http.patch(url, body).subscribe((res) =>{
      console.log(res)
    })
}

  aggiornaMsg(m: Messaggi) {
    return this.http.put(this.chatUrl+`/${m.id}`, m).pipe(catchError(err => {
      console.log(err);
      throw err;
    }))
  }
/*   getNews() {
    return this.http.get<Notizie>(this.newsApiUrls).pipe(catchError(err => {
      console.log(err);
      throw err
    }))
    } */


}




