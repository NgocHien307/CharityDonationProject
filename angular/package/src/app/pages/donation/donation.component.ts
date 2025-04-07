import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from 'src/app/core/service/donation.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonationResponse } from 'src/app/core/models/database/donation-response.model';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  campaignId: number | null = null; // Campaign ID
  amount: number = 0; // Số tiền quyên góp
  message: string = ''; // Thông điệp
  paymentMethod: string = ''; // Phương thức thanh toán
  isAnonymous: boolean = true; // Mặc định là ẩn danh
  userId: number | null = null; // ID của người dùng

  constructor(
    private route: ActivatedRoute,
    private donationService: DonationService,
    private authService: AuthenticationService, // Để lấy thông tin người dùng
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy campaignId từ URL, nếu không có giá trị hợp lệ, để campaignId = null
    const campaignIdFromUrl = this.route.snapshot.paramMap.get('campaignId');
  if (campaignIdFromUrl) {
    this.campaignId = Number(campaignIdFromUrl);
    if (isNaN(this.campaignId)) {
      alert('Campaign ID không hợp lệ.');
      this.router.navigate(['/']);
    }
  }

  if (this.authService.isLoggedIn()) {
    this.userId = this.authService.getUserId();  // Lấy userId từ AuthenticationService
    console.log('User ID:', this.userId);  // Debug để xem userId
  } else {
    this.userId = 7;  // Giá trị mặc định nếu người dùng chưa đăng nhập
  }
}
onPaymentSuccess(response: any): void {
  this.donationService.handlePaymentCallback(response);  // Chuyển hướng nếu thanh toán thành công
}

  onDonate() {
    // Kiểm tra số tiền quyên góp hợp lệ
    if (this.amount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ.");
      return;
    }

    // Kiểm tra campaignId và userId có hợp lệ không
    if (!this.campaignId || !this.userId) {
      alert('Thông tin không hợp lệ. Vui lòng thử lại.');
      return;
    }

    const donationData = {
      amount: this.amount,
      campaignId: this.campaignId,
      userId: this.userId,
      isAnonymous: this.isAnonymous,
      message: this.message,
      paymentMethod: this.paymentMethod
    };

    // Gọi API để tạo donation
    this.donationService.createDonation(donationData).subscribe({
      next: (res: DonationResponse) => {
        console.log('Quyên góp thành công:', res);

        // Lấy URL thanh toán từ phản hồi API
        const paymentUrl = res.url;

        if (paymentUrl) {
          window.location.href = paymentUrl;  // Chuyển hướng đến trang thanh toán
        } else {
          alert('Không có liên kết thanh toán.');
        }
      },
      error: (err) => {
        console.error('Lỗi khi quyên góp:', err);
        alert('Đã có lỗi xảy ra, vui lòng thử lại sau.');
      }
    });

    
  }
}
