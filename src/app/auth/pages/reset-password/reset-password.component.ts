import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatCardModule, ReactiveFormsModule, RouterModule, CommonModule, MatInputModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
   resetPasswordForm: FormGroup
  hideNewPassword = true
  hideConfirmPassword = true
  errorMessage = ""
  successMessage = ""
  isLoading = false
  tokenStatus: "validating" | "valid" | "invalid" = "validating"
  resetToken = ""

  // Password strength indicators
  passwordStrength = 0
  hasMinLength = false
  hasUppercase = false
  hasLowercase = false
  hasNumber = false

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: [
          "",
          [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)],
        ],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    )
  }

  ngOnInit(): void {
    // Get token from URL
    this.resetToken = this.route.snapshot.queryParams["token"] || ""

    if (!this.resetToken) {
      this.tokenStatus = "invalid"
      return
    }

    // Validate token
    this.validateToken()

    // Subscribe to password changes for strength indicator
    this.resetPasswordForm.get("newPassword")?.valueChanges.subscribe((password: any) => {
      this.updatePasswordStrength(password || "")
    })
  }

  private validateToken(): void {
    // Simulate token validation
    setTimeout(() => {
      // In real implementation, validate token with backend
      if (this.isValidToken(this.resetToken)) {
        this.tokenStatus = "valid"
      } else {
        this.tokenStatus = "invalid"
      }
    }, 1500)
  }

  private isValidToken(token: string): boolean {
    // Simulate token validation logic
    // In real implementation, this would be done by your backend
    return token.length > 10 && !token.includes("expired")
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get("newPassword")
    const confirmPassword = control.get("confirmPassword")

    if (!newPassword || !confirmPassword) {
      return null
    }

    return newPassword.value !== confirmPassword.value ? { passwordMismatch: true } : null
  }

  private updatePasswordStrength(password: string): void {
    let strength = 0

    // Check requirements
    this.hasMinLength = password.length >= 8
    this.hasUppercase = /[A-Z]/.test(password)
    this.hasLowercase = /[a-z]/.test(password)
    this.hasNumber = /\d/.test(password)

    // Calculate strength
    if (this.hasMinLength) strength += 25
    if (this.hasUppercase) strength += 25
    if (this.hasLowercase) strength += 25
    if (this.hasNumber) strength += 25

    this.passwordStrength = strength
  }

  getStrengthClass(): string {
    if (this.passwordStrength <= 25) return "weak"
    if (this.passwordStrength <= 50) return "medium"
    if (this.passwordStrength <= 75) return "strong"
    return "very-strong"
  }

  getStrengthText(): string {
    if (this.passwordStrength <= 25) return "Débil"
    if (this.passwordStrength <= 50) return "Regular"
    if (this.passwordStrength <= 75) return "Fuerte"
    return "Muy Fuerte"
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.tokenStatus === "valid") {
      this.isLoading = true
      this.errorMessage = ""
      this.successMessage = ""

      const newPassword = this.resetPasswordForm.get("newPassword")?.value

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false

        // Simulate success/error
        if (this.passwordStrength >= 50) {
          this.successMessage = "¡Contraseña actualizada exitosamente! Redirigiendo al login..."

          // Redirect to login after success
          setTimeout(() => {
            this.router.navigate(["/auth/login"], {
              queryParams: { message: "password-reset-success" },
            })
          }, 2000)
        } else {
          this.errorMessage = "La contraseña no cumple con los requisitos mínimos de seguridad"
        }
      }, 2000)
    }
  }

  // Method to check if form is ready to submit
  isFormValid(): boolean {
    return this.resetPasswordForm.valid && this.passwordStrength >= 50
  }

}
