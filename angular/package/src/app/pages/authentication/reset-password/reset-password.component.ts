import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';  // Thêm Router
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  form = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router  // Thêm Router vào constructor
  ) {}

  ngOnInit() {
    // Lấy token từ query params
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  submit() {
    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    const payload = {
      token: this.token,  // Gửi token cùng mật khẩu mới
      newPassword: this.form.value.newPassword,
    };

    this.http.post('https://localhost:7204/api/Email/reset-password', payload, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Đổi mật khẩu thành công!');
          this.router.navigate(['/authentication/login']);  // Điều hướng về trang đăng nhập
        },
        error: () => alert('Lỗi đổi mật khẩu!')
      });
  }
}
