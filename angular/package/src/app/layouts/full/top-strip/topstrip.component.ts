import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserLogged } from 'src/app/core/utils/user-logged';
import { RolePermissionService } from 'src/app/core/service/role-permission.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { FormsModule } from '@angular/forms';
import { Category, CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-topstrip',
  imports: [
    TablerIconsModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MaterialModule,
    NgScrollbarModule,
    FormsModule
  ],
  templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent implements OnInit {
  public userLogged = new UserLogged();
  isAdminUser: boolean = false;
  isUser: boolean = false;
  isNoUser: boolean = false;
  campaigns: any[] = [];
  categories: Category[] = [];
  searchQuery: string = '';
  filteredCampaigns: Campaign[] = [];
  isLoggedIn = false;

  constructor(
    private rolePermissionService: RolePermissionService,
    private router: Router,
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCampaigns();
    this.getCategories();
    this.loadCategories();

    // Kiểm tra token từ localStorage khi khởi tạo component
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;  // Nếu có token, isLoggedIn = true

    // Kiểm tra quyền người dùng
    this.isAdminUser = this.rolePermissionService.hasRole(['Admin']);
    this.isUser = this.rolePermissionService.hasRole(['User']);
    this.isNoUser = this.rolePermissionService.hasRole(['No-User']);
  }

  goToCategory(categoryId: number): void {
    console.log('Navigating to category:', categoryId);
    this.router.navigate(['/categories', categoryId]);
  }

  logout(): void {
    this.userLogged.logout();
    this.isLoggedIn = false; // Đảm bảo cập nhật lại trạng thái đăng nhập
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
  }

  getCampaigns(): void {
    this.http.get<any[]>('https://localhost:7204/api/campaign/Get-all-campaigns')
      .subscribe({
        next: (data) => this.campaigns = data,
        error: (err) => console.error('Error fetching campaigns:', err)
      });
  }

  getCategories(): void {
    this.http.get<any[]>('https://localhost:7204/api/campaign/Get-all-Category')
      .subscribe({
        next: (data) => this.categories = data,
        error: (err) => console.error('Error fetching categories:', err)
      });
  }

  searchCampaigns(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.filteredCampaigns = this.campaigns.filter(campaign =>
        campaign.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.router.navigate(['/search-results'], { queryParams: { query: this.searchQuery } });
    } else {
      this.filteredCampaigns = [];
    }
  }

  loadCategories(): void {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (data) => {
          console.log('Categories:', data);
          this.categories = data;
        },
        error: (err) => console.error('Error fetching categories:', err)
      });
  }
}
