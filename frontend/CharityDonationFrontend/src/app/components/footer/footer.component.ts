import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  categories: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.http.get<any[]>('https://localhost:7204/api/campaign/Get-all-Category')
      .subscribe({
        next: (data) => this.categories = data.slice(0, 5), // Lấy 5 danh mục đầu tiên
        error: (err) => console.error('Lỗi khi lấy danh mục:', err)
      });
  }
}
