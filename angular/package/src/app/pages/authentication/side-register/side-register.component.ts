import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from 'src/app/core/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(
    private settings: CoreService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordHash: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });
  
  

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;
  
    const now = new Date().toISOString();
  
    const userPayload = {
      id: 0,
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      passwordHash: this.form.value.passwordHash,
      isActive: true,
      phoneNumber: this.form.value.phoneNumber,
      avatarUrl: 'string',
      registerDate: now,
      lastLoginDate: now,
      roleId: 2
    };
  
    this.userService.AddUser(userPayload).subscribe({
      next: (res) => {
        this.snackBar.open('🎉 Đăng ký thành công!', 'Đóng', {
          duration: 3000, // Hiển thị 3 giây
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
  
        // Chuyển hướng sau khi show thông báo 1 chút
        setTimeout(() => {
          this.router.navigate(['/authentication/login']);
        }, 1000);
      },
      error: (err) => {
        this.snackBar.open('❌ Có lỗi xảy ra khi đăng ký!', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
}
}
