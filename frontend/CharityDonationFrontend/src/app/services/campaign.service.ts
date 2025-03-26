import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'https://localhost:7204/api/campaign'; // API gốc

  constructor(private http: HttpClient) {}

  // Lấy tất cả chiến dịch
  getCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Get-all-campaigns`);
  }

  // Lấy chiến dịch theo ID
  getCampaignById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Get-Campaign-by-Id?id=${id}`);
  }
}
