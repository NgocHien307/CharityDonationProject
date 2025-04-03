import { Component, inject, model, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {
  UserMenuPermission,
  Users,
} from 'src/app/core/models/database/db.model';
import { UserService } from 'src/app/core/service/user.service';
interface Status {
  value: boolean;
  viewValue: string;
}
interface role {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-edit-user',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    NgxSpinnerModule,
    MatDialogModule,
    ToastrModule,
    CommonModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  public staffid: number;
  public staff: Users;
  public userStatus: boolean;
  public isValidEmail: boolean = true; // Biến kiểm tra email hợp lệ

  constructor(
    private spinnerService: NgxSpinnerService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.onGetUrlandCallingApi();
      this.spinnerService.hide();
    }, 2000);
  }

  readonly checked = model(false);
  readonly indeterminate = model(false);

  stt: Status[] = [
    { value: false, viewValue: 'Ngưng hoạt động' },
    { value: true, viewValue: 'Hoạt động' },
  ];
  role: role[] = [
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'User' },
    { value: 3, viewValue: 'No-user' },
    { value: 4, viewValue: 'Creator' },
  ];

  onInputChange(value: any, eventValue: any) {
    let valueReal = '';
    if (value == 'Status' || value == 'RoleId') {
      valueReal = eventValue;
    } else {
      valueReal = eventValue.target.value;
    }

    // Kiểm tra email khi người dùng thay đổi
    if (value === 'Email') {
      this.isValidEmail = valueReal.endsWith('@gmail.com');
    }

    const data = { ...this.staff, [value]: valueReal };
    this.staff = data;
  }

  onSubmit() {
    let errors = [];

    // Kiểm tra tất cả các trường dữ liệu
    if (!this.staff.FullName) {
      errors.push('Họ và tên không được để trống.');
    }
    if (!this.staff.PhoneNumber) {
      errors.push('Số điện thoại không được để trống.');
    }
    if (!this.staff.Email) {
      errors.push('Email không được để trống.');
    } else if (!this.isValidEmail) {
      errors.push('Email phải kết thúc bằng @gmail.com.');
    }
    if (!this.staffid && !this.staff.PassWord) {
      errors.push('Mật khẩu không được để trống.');
    }
    if (this.staff.RoleId == null) {
      errors.push('Vui lòng chọn quyền.');
    }
    if (this.staff.Status == null) {
      errors.push('Vui lòng chọn trạng thái.');
    }

    // Nếu có lỗi, hiển thị thông báo
    if (errors.length > 0) {
      errors.forEach((error) => {
        this.toastService.error(error, 'Lỗi');
      });
      return;
    }

    // Nếu không có lỗi, tiếp tục gửi dữ liệu
    let formData = {
      id: this.staffid,
      fullName: this.staff.FullName,
      phoneNumber: this.staff.PhoneNumber,
      email: this.staff.Email,
      isActive: this.staff.Status,
      passwordHash: this.staff.PassWord,
      roleId: this.staff.RoleId,
      registerDate: this.staff.RegisterDate,
      lastLoginDate: new Date(),
      avatarUrl: '',
    };

    // Cập nhật hoặc thêm người dùng
    if (this.staffid) {
      this.service.UpdateUser(formData, this.staffid).subscribe(
        (data) => {
          this.service
            .RolPermission(this.staff.RoleId, this.staffid)
            .subscribe(() => {
              this.toastService.success(
                'Cập nhật người dùng thành công',
                'Thành công'
              );
            });
        },
        (error) => {
          this.toastService.error('Cập nhật người dùng thất bại', 'Thất bại');
        }
      );
    } else {
      this.service.AddUser(formData).subscribe(
        (data) => {
          this.toastService.success('Thêm người dùng thành công', 'Thành công');
        },
        (error) => {
          this.toastService.error('Thêm người dùng thất bại', 'Thất bại');
        }
      );
    }
  }

  onGetData(id: any) {
    if (this.staffid) {
      this.service.getUserbyId(id).subscribe((data) => {
        console.log('data', data);
        this.staff = data;
        this.userStatus = data.Status;
      });
    } else {
      this.staff = new Users();
      this.userStatus = false;
    }
  }

  onGetUrlandCallingApi() {
    this.route.params.subscribe((params) => {
      this.staffid = params['id'];
      this.onGetData(this.staffid);
    });
  }
}
