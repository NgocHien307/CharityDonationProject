import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  transactionReference = '';
  success = false;
  amount = 0;
  paymentMethod = '';
  paymentStatus = '';
  transactionDate = '';
  paymentNote = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.transactionReference = params['transactionReference'];
      this.success = params['success'] === 'true';
      this.amount = +params['amount'];
      this.paymentMethod = params['paymentMethod'];
      this.paymentStatus = params['paymentStatus'];
      this.transactionDate = params['transactionDate'];
      this.paymentNote = params['paymentNote'];
    });
  }

  // Nút quay lại trang chủ
  goHome() {
    this.router.navigate(['/home']);
  }
}
