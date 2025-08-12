import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private http: HttpClient, private router: Router) {}

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  onSubmit() {
    if (this.signupForm.valid) {
      this.http.post('http://localhost:3000/api/auth/signup', this.signupForm.value, { headers: { 'Content-Type': 'application/json' }
      }).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        }, 
        error: (err) => {
          console.error('Sign up failed', err);
          alert('Username exists or server error');
        }
      });
    } else {
      console.log('Form invalid');
    }
  }
}