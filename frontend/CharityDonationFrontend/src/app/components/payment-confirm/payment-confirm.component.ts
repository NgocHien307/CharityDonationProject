import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
  transactionId!: number;
  transaction?: Transaction;
  confirmationData = { paymentStatus: 'Completed' };

  constructor(private paymentService: PaymentService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.transactionId = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirmPayment() {
    this.paymentService.confirmPayment(this.transactionId, this.confirmationData).subscribe({
      next: (data) => {
        this.transaction = data;
        console.log('Thanh toán đã được xác nhận:', data);
      },
      error: (err) => console.error('Lỗi xác nhận thanh toán:', err)
    });
  }
}
