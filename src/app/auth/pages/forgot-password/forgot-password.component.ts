import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatCardModule, ReactiveFormsModule, RouterModule, CommonModule, MatInputModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup
  errorMessage = ""
  successMessage = ""
  isLoading = false;
  private readonly authService = inject(AuthService)

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }


  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true
      this.errorMessage = ""
      this.successMessage = ""

      const email = this.forgotPasswordForm.get("email")?.value

      this.authService.requestEmailForgot({email}).subscribe({
        next: res => {
          this.isLoading = false
          this.successMessage = `Se ha enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada y spam.`
        },
        error: err => {
           this.isLoading = false
          this.errorMessage = "No se encontró una cuenta asociada a este correo electrónico."
        }
      })


    }
  }

  private isValidEmail(email: string): boolean {
    // Simulate email validation against database
    // In real implementation, this would be handled by your backend
    const validEmails = ["test@example.com", "user@miauhorros.com", "demo@test.com"]
    return validEmails.includes(email.toLowerCase())
  }

  // Method to resend email (optional)
  resendEmail(): void {
    if (this.successMessage && this.forgotPasswordForm.valid) {
      this.onSubmit()
    }
  }
}
