import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // Base URL của API cho transaction
  private baseUrl = `${environment.apiUrl}/transaction`;

  constructor(private http: HttpClient) { }

  // Xác nhận thanh toán (endpoint: confirm/{id})
  confirmPayment(transactionId: number, confirmPaymentVm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm/${transactionId}`, confirmPaymentVm);
  }

  // Tạo giao dịch (endpoint: create)
  createTransaction(transactionVm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, transactionVm);
  }
}
