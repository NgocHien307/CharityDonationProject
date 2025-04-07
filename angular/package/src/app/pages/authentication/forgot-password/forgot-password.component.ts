import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from 'src/app/core/service/email.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder, 
    private emailService: EmailService, 
    private toastr: ToastrService
  ) {}

  submit() {
    if (this.form.invalid) {
      return;
    }
  
    const email = this.form.value.email;
  
    // Kiểm tra nếu email là hợp lệ (không null hoặc undefined)
    if (email) {
      // Gọi service gửi email reset password
      this.emailService.sendEmail(email).subscribe({
        next: (response) => {
          this.toastr.success('Đã gửi email reset password!', 'Thành công');
        },
        error: (error) => {
          this.toastr.error('Lỗi gửi email!', 'Thất bại');
        }
      });
    } else {
      this.toastr.error('Email không hợp lệ!', 'Thất bại');
    }
  }
  
}
