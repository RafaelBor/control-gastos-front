import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../../commons/services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export default class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  errorMessage: string | null = null
  private readonly authService = inject(AuthService)
  private  readonly alertService = inject(AlertService) 
  private readonly router = inject(Router)
  constructor(private readonly fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.checkPasswords });

     this.registerForm.get('password')?.valueChanges.subscribe(() => {
    this.registerForm.updateValueAndValidity(); // Fuerza reevaluar el validador
  });

  this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
    this.registerForm.updateValueAndValidity(); // También al escribir en confirm
  });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: res => {
          this.router.navigate(['/auth/verificar-email'], {
            queryParams: { email: this.registerForm.value.email }
          }); 
        },
        error: err => {
          console.log(err)
           if(err.statusCode === 400){
            this.errorMessage = 'La contraseña debe de tener mayusculas, minusculas y numeros.'
          }else{
            this.alertService.error('Hubo un error al realizar el registro');
          }
          
        }
      })
      // Aquí iría la lógica de registro
    }
  }
}
