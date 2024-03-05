import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Sersh-Academy';
  hasLocal: boolean = false;
  hasSession: boolean = false;

  constructor(private readonly _router: Router) {
  }
  ngOnInit(): void {
    localStorage.getItem('token') ? this.hasLocal = true : this.hasLocal = false
    sessionStorage.getItem('token') ? this.hasSession = true : this.hasSession = false
    console.log(this.hasLocal, this.hasSession)
    if (!this.hasLocal && !this.hasSession) {
      this._router.navigate(['/login']);
    }
  }
}
