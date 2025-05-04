import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  bootstrap: any;

  authForm: FormGroup;
  isLogin = true;
  passwordVisibility = {
    password: false,
    confirmPassword: false
  };

  passwordStrength = 0;


  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
      confirmPassword: ['']
    }, {
      validators: passwordMatchValidator
    });
  }
  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipEl => {
      new this.bootstrap.Tooltip(tooltipEl);
    });
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password, confirmPassword } = this.authForm.value;

    if (!this.isLogin && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (this.isLogin) {
      console.log('Logging in with:', { email, password });
      // Call login API
    } else {
      console.log('Registering:', { email, password });
      // Call registration API
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
  }
  checkPasswordStrength() {
    const password = this.authForm.get('password')?.value || '';
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    // Normalize to 0–4 for the 4-meter bars
    this.passwordStrength = Math.min(score, 4);
  }

}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}
