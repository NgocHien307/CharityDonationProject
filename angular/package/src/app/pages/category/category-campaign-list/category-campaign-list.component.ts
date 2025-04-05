import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/core/service/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-campaign-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-campaign-list.component.html',
})
export class CategoryCampaignListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId!: number;
  campaigns: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.params.subscribe(params => {
      this.selectedCategoryId = +params['id'];
      this.loadCampaigns();
    });
  }

  loadCategories(): void {
    this.http.get<Category[]>('https://localhost:7204/api/campaign/Get-all-Category')
      .subscribe({
        next: (data) => this.categories = data,
        error: (err) => console.error('Error fetching categories:', err)
      });
  }

  loadCampaigns(): void {
    this.http.get<any[]>(`https://localhost:7204/api/campaign/Category/${this.selectedCategoryId}`)
      .subscribe({
        next: (data) => {
          // Kiểm tra nếu không có chiến dịch, hiển thị thông báo lỗi
          if (data && data.length > 0) {
            this.campaigns = data;
            this.errorMessage = ''; // Xóa thông báo lỗi nếu có chiến dịch
          } else {
            this.campaigns = [];
            this.errorMessage = 'Không có chiến dịch nào cho danh mục này.'; // Hiển thị thông báo nếu không có chiến dịch
          }
        },
        error: (err) => {
          console.error('Error fetching campaigns:', err);
          this.campaigns = []; // Xóa danh sách chiến dịch khi có lỗi
          this.errorMessage = 'Đã có lỗi xảy ra khi tải chiến dịch.'; // Hiển thị thông báo lỗi khi có lỗi API
        }
      });
  }
  

  getProgressPercentage(collected: number, goal: number): number {
    return goal > 0 ? Math.min((collected / goal) * 100, 100) : 0;
  }

  getDaysLeft(endDate: Date | null): number {
    if (!endDate) return 0;
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.loadCampaigns();
  }
}
