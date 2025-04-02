import {
  Component, OnInit, Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
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



@Component({
  selector: 'app-topstrip',
  imports: [TablerIconsModule, MatButtonModule, MatMenuModule, RouterModule, CommonModule, MaterialModule, NgScrollbarModule, FormsModule],
  templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent implements OnInit {
  public userLogged = new UserLogged();
  isAdminUser: boolean = true;
  isUser: boolean = true;
  campaigns: any[] = [];
  categories: any[] = [];
  searchQuery: string = '';
  filteredCampaigns: Campaign[] = [];

  constructor(private rolePermissionService: RolePermissionService, private router: Router, private http: HttpClient) {
    this.isAdminUser = this.rolePermissionService.hasRole(['Admin']);
  }
  ngOnInit(): void {
    this.getCampaigns();
    this.getCategories();
  }

  logout() {
    this.userLogged.logout();
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
        error: (err) => console.error('Error fetching campaigns:', err)
      });
  }
  searchCampaigns(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { query: this.searchQuery } });
    }
  }

}
