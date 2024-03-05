import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: MainComponent
  },
  {
    path: '', component: MainComponent
  },

];
