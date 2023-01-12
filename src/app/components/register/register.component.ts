import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterRequest } from 'src/app/auth/auth-response';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Avatars } from '../post/post';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Skills } from '../post/post';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

@Input() a!: any

  err:string | undefined;
  f !:FormGroup;
  avatar: Avatars[] = [];
  impiego!: string

  skills = [
    {name: 'Html 5', value:' Html5', id:'1'},
    {name: 'Css', value:' CSS', id:'2'},
    {name: 'Bootstrap', value:' Bootstrap', id:'3'},
    {name: 'Javascript', value:' Javascript', id:'4'},
    {name: 'NodeJs', value:' Nodejs', id:'5'},
    {name:'Typescript', value:' Typescript', id:'6'},
    {name:'Angular', value:' Angular', id:'7'},
    {name:'React', value:' React', id:'8'},
    {name:'Java', value:' Java', id:'9'},
    {name:'PHP', value:' Php', id:'10'},
    {name:'C++', value:' C++', id:'11'},
    {name:'MySQL',value:' MySQL', id:'12'}
  ];

    selectedSkills:any = [];



  constructor(private fb:FormBuilder, private authSrv: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.f = new FormGroup({
      nome: new FormControl("", Validators.required),
      cognome: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      impiego: new FormControl(null, Validators.required),
      citta: new FormControl(null, Validators.required),
      avatar: new FormControl(''),
      selectedSkills: new FormControl('')
    })

  }

  register(f:FormGroup): void {
    console.log(this.selectedSkills)
    let competenze = this.selectedSkills
    let strNome = f.value.nome
    let strCognome = f.value.cognome
    let newNome = strNome.charAt(0).toUpperCase() + strNome.slice(1)
    let newCognome = strCognome.charAt(0).toUpperCase() + strCognome.slice(1)
    console.log(competenze)
    let data :RegisterRequest = {
      email: f.value.email,
      password: f.value.password,
      nome: newNome,
      cognome: newCognome,
      impiego: f.value.impiego,
      citta: f.value.citta,
      avatar: f.value.avatar,
      selectedSkills: competenze,
      recezioneMess:false
    }
    this.authSrv.registrati(data).pipe(catchError(err =>{
      this.err = err.error
      throw err
    })).subscribe(res => {
      this.err = undefined
      this.router.navigate(['/login']);
    })
    console.log(f)
  }

   getAvatar() {
   console.log(this.avatar.values)
    }

    getJob() {
      console.log(this.impiego)
    }

    setCheckbox(event:any, value:any) {
      if (event.target.checked){
        this.selectedSkills.push(value.value)
      } else {
        this.selectedSkills = this.selectedSkills.filter(val => val != value);
      }
    }

     saveOptions() {
      console.log(this.selectedSkills);
     }
   /* getSkills(event, skill) {
      if ( event.target.checked) {
        this.selectedSkills.push(skill.name);
      } else {
        this.selectedSkills.splice(this.selectedSkills.indexOf(skill.name), 1);
      }
      console.log(this.selectedSkills)
    }
     onCheck(event) {
      if (this.selectedSkills.includes(event)) {
        this.selectedSkills.push(event);
      } else {
        var index = this.selectedSkills.indexOf(event);
        if (index > - 1) {
          this.selectedSkills.splice(index, 1);
        }
      }
      console.log(this.selectedSkills.values);
    } */

    }





