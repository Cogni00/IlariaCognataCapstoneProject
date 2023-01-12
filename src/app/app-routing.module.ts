import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ChatFiglioComponent } from './components/chat/chat-figlio/chat-figlio.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
 {
  path:'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard],
 },
 {
  path:'post',
  component: PostComponent,
  canActivate: [AuthGuard],
 },
{
  path:'',
  component: HomeComponent,
  canActivate: [AuthGuard],
 },
 { path:'navbar',
   component: NavbarComponent,
   canActivate: [AuthGuard],
  },
  {
      path:'search',
      component: SearchComponent
  },
 {
  path:'chat',
  component: ChatComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: "chat-figlio/:id",
      component: ChatFiglioComponent
    }
  ]
 },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
