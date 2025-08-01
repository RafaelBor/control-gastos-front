import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/enums/auth-status.enum';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './commons/components/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router)

  public finishedAuthCheck = computed(() => {
    
    if(this.authService.authStatus() === AuthStatus.cheking){
      
      return false;
    }
    return true;
  })

  public authStatusChangedEddect = effect(() => {
    switch(this.authService.authStatus()){
      case AuthStatus.cheking:
        return;
      
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard/home')
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
        return;

    }
  })
}
