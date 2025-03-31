import { Component } from '@angular/core';
import { PartnerService } from 'src/app/core/service/partner.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner-detail',
  imports: [CommonModule],
  templateUrl: './partner-detail.component.html',
  styleUrl: './partner-detail.component.scss'
})
export class PartnerDetailComponent  {
  partner: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.partnerService.getPartnerById(id).subscribe({
        next: (data) => {
          this.partner = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi lấy dữ liệu chi tiết đối tác:', err);
          this.isLoading = false;
        }
      });
    } else {
      console.error('ID không hợp lệ.');
      this.isLoading = false;
    }
  }
}


