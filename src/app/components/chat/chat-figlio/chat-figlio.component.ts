 import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../post/post.service';
import { Messaggi } from '../../post/post';

@Component({
  selector: 'app-chat-figlio',
  templateUrl: './chat-figlio.component.html',
  styleUrls: ['./chat-figlio.component.scss']
})
export class ChatFiglioComponent implements OnInit {

@Output() mandaNotificheChat = new EventEmitter<string[]>()

  id: number;
 messaggi:any
 chat=[]
 ricevente: string;
 riceventeNome:string
 riceventeAvatar: string



  constructor( private route:ActivatedRoute, private postSrv:PostService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let x = params.get("id");
      this.id = parseFloat(x);
      this.getUtente(this.id)
      this.riceviMessaggio()
    })
  }
 getUtente(id: number) {
  this.postSrv.prendiNome(id).subscribe(res => {
    console.log(res);
    this.ricevente = res.nome +' '+ res.cognome
    this.riceventeNome= res.nome
    this.riceventeAvatar = res.avatar
  })
 }

 inviaMess(form: NgForm) {
  let user = localStorage.getItem('user')
  let utente = JSON.parse(user)
  console.log(form.value.messaggio)
  let data = {
  senderId: utente.user.id,
  senderName: utente.user.nome,
  text: form.value.messaggio,
  receiverId: this.id,
  receiverName: this.riceventeNome,
  pending:true
 }
 this.postSrv.sendMessage(data).subscribe(res => {
  console.log(res)
  form.reset()
  window.location.reload()
 })
 this.postSrv.modificaBoolean(this.id, true)
 }


riceviMessaggio() {
  let user = localStorage.getItem('user')
  let utente = JSON.parse(user)
  this.postSrv.recieveMessagge().subscribe(res => {
    console.log(res);
    this.messaggi = res;
    this.chat=[]
    for (let i=0; i<this.messaggi.length; i++){
      console.log(this.messaggi[i].receiverId);
      if(this.messaggi[i].receiverId==utente.user.id && this.messaggi[i].senderId==this.id){
        this.messaggi[i].notifica = false
        this.chat.push(this.messaggi[i])
      } else if(this.messaggi[i].receiverId==this.id && this.messaggi[i].senderId==utente.user.id){
        this.messaggi[i].notifica = false
        this.chat.push(this.messaggi[i])
      }
    } console.log(this.chat);

  })
}
}
