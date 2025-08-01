import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
     MatIconModule,
      MatCheckboxModule,
      MatInputModule,
      MatButtonModule, 
      ReactiveFormsModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  errorMessage: string | null = null
  notVerified: boolean = false;
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['rafael@gmail.com', [Validators.required, Validators.email]],
      password: ['Rafael1', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigateByUrl('/dashboard/home'),
        error: (error) => {
          console.log({loginerror: error})
          if(error.statusCode === 400){
            this.errorMessage = 'La contraseña debe de tener mayusculas, minusculas y numeros.'
          }
          if(error.statusCode === 401){
            this.errorMessage = 'La contraseña o el correo son invalidos.'
          }
          if(error.statusCode === 403){
            this.errorMessage = 'La cuenta no esta verificada, necesita verificar su correo para acceder.'
            this.notVerified = true;
          }
        }
      })
    }
  }
}
