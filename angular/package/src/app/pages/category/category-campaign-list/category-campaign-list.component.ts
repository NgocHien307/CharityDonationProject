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
      this.selectedCategoryId = +params['id']; // Lấy ID từ URL
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
          if (data && data.length > 0) {
            this.campaigns = data;
            this.errorMessage = ''; // Reset lỗi nếu có campaign
          } else {
            this.campaigns = [];
            this.errorMessage = 'Không có chiến dịch nào cho danh mục này.'; // Lỗi nếu không có campaign
          }
        },
        error: (err) => {
          console.error('Error fetching campaigns:', err);
          this.campaigns = [];
          this.errorMessage = 'Đã có lỗi xảy ra khi tải chiến dịch.'; // Lỗi tải chiến dịch
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
    this.loadCampaigns(); // Tải lại campaign khi thay đổi danh mục
  }
}
