import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/core/service/partner.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-partner',
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './list-partner.component.html',
  styleUrl: './list-partner.component.scss'
})
export class ListPartnerComponent implements OnInit {
  partners: any[] = [];
  isLoading = true;
  currentPage = 1; 

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        this.partners = data.filter(p => p.isVerified);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy dữ liệu đối tác:', err);
        this.isLoading = false;
      }
    });
  }
}


