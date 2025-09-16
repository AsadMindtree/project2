import { Component, effect, inject, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/token';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  mode = signal<'login' | 'signup'>('login');
  loginModel = {
    email: '',
    password: '',
  };

  private fb = inject(FormBuilder);
  private token = inject(TokenService);
  private router = inject(Router);

  signupForm: FormGroup;

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]],
      accept: [false, [Validators.requiredTrue]],
    });

    effect(() => {
      console.log('Auth Mode: ', this.mode());
    });
  }

  setMode(next: 'login' | 'signup') {
    this.mode.set(next);
  }

  onLogin(formValid: boolean) {
    if (!formValid) return;
    const t = this.token.makeRandomToken();
    this.token.set(t);
    alert('Logged in! Demo Token set');
    this.router.navigateByUrl('/');
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { password, confirm } = this.signupForm.value;
    if (password !== confirm) {
      this.signupForm.get('confirm')?.setErrors({ mismatch: true });
      return;
    }

    const t = this.token.makeRandomToken();
    this.token.set(t);
    alert('Account Created! Demo Token set');
    this.router.navigateByUrl('/');
  }

  showError(name: string, error: string) {
    const ctrl = this.signupForm.get(name);
    return ctrl?.touched && ctrl.hasError(error);
  }
}
