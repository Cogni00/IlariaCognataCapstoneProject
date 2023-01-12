import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post/post';
import { PostService } from '../post/post.service';
import { MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() p!: any

  nome!:string;
  posts: Post[] =[]
  cognome!: string;
  user_id!: number;
  testo!: string;
  impiego!: string;
  citta!: string;
  avatar!: string;
  selectedSkills: []

  err!: string;


  constructor(private authSrv: AuthService, private postSrv: PostService,  private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.prendiInfoPersonali();
    console.log(this.cognome)
    this.prendiPost();
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
  }

  prendiPost() {
    this.postSrv.prendiPostDaId().subscribe((res) => {

      console.log(res);
      if (res.length === 0 ) {
        console.log( "Array is empty!")
        this.err = `Non hai ancora postato nulla. Inizia subito!`
      } else {
        this.posts = res
        console.log(res);
      }
    })
  }

  esci() {
    this.authSrv.esci()
  }


}
