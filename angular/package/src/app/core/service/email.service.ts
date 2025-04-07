import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'https://localhost:7204/api/Email/forgot-password';  // Điều chỉnh lại URL của backend

  constructor(private http: HttpClient) {}

  sendEmail(email: string): Observable<any> {  // Không cần token
    const body = { email };  // Đảm bảo dữ liệu bạn gửi theo yêu cầu của backend
    return this.http.post<any>(this.apiUrl, body);
  }
}
