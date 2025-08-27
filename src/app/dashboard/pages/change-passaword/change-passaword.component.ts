import { AlertService } from './../../../commons/services/alert.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordMatchValidator } from '../../../commons/utils/password_match';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-change-passaword',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './change-passaword.component.html',
  styleUrl: './change-passaword.component.css'
})
export class ChangePassawordComponent {

  isMessageError = false
  messageError = ''
  form: FormGroup;
  authService = inject(AuthService)
  alertService = inject(AlertService)

  constructor(private readonly fb: FormBuilder,){
     this.form = this.fb.group({
            currentPassword: [null, [Validators.required]],
            newPassword: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
      }, {
        validator: passwordMatchValidator()
      });
  }


  changePassword(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.changePassword(this.form.value).subscribe({
      next: res => {
        this.form.reset();
        this.alertService.success('Se cambio la contraseña correctamente.')
      },
      error: err => {
        this.isMessageError = true;
        this.messageError = err
        this.alertService.error('Hubo un error al cambiar la contraseña.')
      }
    })
  }
}
