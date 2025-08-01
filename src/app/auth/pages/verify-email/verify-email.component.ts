import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {
  verifyForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  email!: string;
  private readonly authService = inject(AuthService)

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
    this.verifyForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.sendVerification()
  }

  sendVerification(){

    if(!this.email){
      return;
    }

    const request = {
      email: this.email 
    }

    this.authService.sendVerification(request).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  verifyCode() {
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    this.authService.verifyCode(this.verifyForm.value).subscribe({
      next: () => {
        this.successMessage = 'Correo verificado correctamente';
        setTimeout(() => this.router.navigate(['auth/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Ocurrió un error';
      },
    });
  }
}
