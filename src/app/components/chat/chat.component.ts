import { Component, OnInit, Output } from '@angular/core';
import { PostService } from '../post/post.service';
import { User } from 'src/app/auth/auth-response';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
[x: string]: any;

  users: User[] =[]
  messaggi:any
  id:number;
  buttonCollapse: any;
  constructor(private postSrv:PostService) { }

  ngOnInit(): void {
    this.getChatUser();

  }

  getChatUser() {
  this.postSrv.prendiUtentiChat().subscribe((res) => {
    let utenti = res
    console.log(utenti);
  let user = localStorage.getItem('user')
    let utenteLoggato = JSON.parse(user)
   for (let i =0; i< utenti.length; i++){
     console.log(utenteLoggato.user.id);
      if(utenti[i].id==utenteLoggato.user.id) {
        utenti.splice(i,1)
        this.users=utenti
      }
    }
  })
  }
  onRiceviNotifiche(value: string[]){
    console.log(value)
  }

/*   notificaMessaggi(){
    let user = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.postSrv.recieveMessagge(utente.user.id, this.id).subscribe(res => {
      this.messaggi = res;
      console.log(res)
  })
} */
}
