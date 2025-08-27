import { Component, inject, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  errorMessage: string | null = null
  notVerified: boolean = false;
  deferredPrompt: any;
  showInstallButton = false;
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  constructor(private readonly fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['rafael@gmail.com', [Validators.required, Validators.email]],
      password: ['Rafael1', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
      window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault(); // Previene que el navegador lo muestre automáticamente
      this.deferredPrompt = event;
      this.showInstallButton = true; // Muestra tu botón personalizado
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => this.router.navigateByUrl('/dashboard/home'),
        error: (error) => {
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

    installApp(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario canceló la instalación');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }
}
