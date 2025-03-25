import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

interface Campaign {
  id: number;
  title: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  campaigns: any[] = []; 
  categories: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCampaigns();
    this.getCategories();
  }

  getCampaigns(): void {
    this.http.get<any[]>('https://localhost:7204/api/campaign/Get-all-campaigns')
      .subscribe({
        next: (data) => this.campaigns = data, // Đảm bảo dùng campaigns
        error: (err) => console.error('Error fetching campaigns:', err)
      });
  }

  getCategories(): void {
    this.http.get<any[]>('https://localhost:7204/api/campaign/Get-all-Category')
      .subscribe({
        next: (data) => this.categories = data, // Đảm bảo dùng campaigns
        error: (err) => console.error('Error fetching campaigns:', err)
      });
  }

}
