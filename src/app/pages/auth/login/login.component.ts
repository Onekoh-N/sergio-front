import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //PROPIEDADES
  loginForm: FormGroup;
  loading: boolean = false;
  message: string = '';

  //CONSTRUCTOR
  constructor(private _router: Router, private formBuilder: FormBuilder, private _authService: AuthService) {
    this.loginForm =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  //METODOS
  register() {
    this._router.navigate(['/register']);
  }

  //Login
  login() {
    this.loginForm.markAllAsTouched();
    this.loading = true;
    if (this.loginForm.valid){
      const userData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this._authService.login(userData).subscribe({
        next: (res) => {
          console.log(res.data);
          const data = res.data;
          if(data.token && data.userData){
            const firma: string = this._authService.firmarDatos(data.userData);
            if(this.loginForm.value.remember) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('userData', JSON.stringify(data.userData));
              localStorage.setItem('firma', firma);
            } else {
              sessionStorage.setItem('token', data.token);
              sessionStorage.setItem('userData', JSON.stringify(data.userData));
              sessionStorage.setItem('firma', firma);
            }
          } else {
            this.message = res.message;
          }
        },
        error: (error) => {
          console.log(error);
          if(error.statusCode == 401) {
            this.message = error.message;
          }
          this.loading = false;
        },
        complete: () => {
          this.loginForm.reset();
          this._router.navigate(['/home']);
          this.loading = false;
        }
      });}
  }
  recupero() {
  throw new Error('Method not implemented.');
  }

    //VALIDATORS
    hasErrors(controlName: string, errorType: string) {
      return this.loginForm.get(controlName)?.touched && this.loginForm.get(controlName)?.hasError(errorType);
    }
}
