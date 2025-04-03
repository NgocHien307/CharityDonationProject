import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { productsData } from '../../ui-components/tables/tables.component';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import { Users } from 'src/app/core/models/database/db.model';

@Component({
  selector: 'app-list-users',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public listUser: Users[] = [];
  dataSource1 = new MatTableDataSource<Users>(this.listUser);

  displayedColumns1: string[] = [
    'assigned',
    'fullname',
    'name',
    'priority',
    'budget',
  ];

  constructor(
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.onGetData();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }

  onClickAdd() {
    this.router.navigate(['list-users/add-user']);
  }

  onGetData() {
    this.service.getListUser().subscribe((data) => {
      console.log('data', data);
      this.listUser = data;
      this.dataSource1 = new MatTableDataSource<Users>(this.listUser);
      this.dataSource1.paginator = this.paginator;
      console.log(this.dataSource1);
    });
  }

  onDetailPage(element: any) {
    this.router.navigate(['list-users/edit-user/' + element]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource1.filter = filterValue;

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  onDeleteUser(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      this.service.deleteUser(id).subscribe(
        () => {
          alert('Xóa người dùng thành công!');
          this.onGetData(); // Cập nhật danh sách
        },
        (error) => {
          console.error('Lỗi khi xóa:', error);
          alert('Xóa người dùng thất bại!');
        }
      );
    }
  }
}
