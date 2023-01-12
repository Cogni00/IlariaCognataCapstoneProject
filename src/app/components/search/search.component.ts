import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post/post.service';
import { User } from 'src/app/auth/auth-response';
import { Post } from '../post/post';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() persona: any;

  //nomeUtente: string;
  /* utente: string; */
  ricerca: User[];
  selectedSkills: []
  posts: Post[] =[]

  err!: string;

  constructor(private postSrv: PostService) { }

  ngOnInit(): void {
   /*  this.utente =
    console.log(this.utente) */
    this.postSrv.getUtenteFiltered(sessionStorage.getItem('nome')).subscribe((res) => {
      this.ricerca = res;
      console.log(this.ricerca)
    }
    )
    /* this.prendiPost() */
  }

/*   prendiPost() {
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
  } */

}
