import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JsonConvert } from 'json2typescript';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ApiService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  Login(formData: any): Observable<any> {
    let url = `/api/auth/Login`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        if (res.token) {
          localStorage.setItem('auth_token', res.token); // Lưu token vào localStorage
        }
        // Lưu userId vào localStorage hoặc trả về cho ứng dụng sử dụng
        if (res.userId) {
          localStorage.setItem('user_id', res.userId.toString()); // Lưu userId vào localStorage
        }
        return res;
      })
    );
  }
  
  
  

  // Hàm kiểm tra xem người dùng có đăng nhập hay không
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại theo giây
      // Kiểm tra token hết hạn
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true; // Token còn hiệu lực
      }
    }
    return false; // Token không có hoặc đã hết hạn
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('user_id');
    return userId ? Number(userId) : null;  // Nếu không có userId trong localStorage, trả về null
  }
  
  

  // Hàm lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
  }
}
