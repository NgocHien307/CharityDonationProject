  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Campaign } from '../models/campaign';
  import { Observable } from 'rxjs';
  import { environment } from '../environments/environment';


  @Injectable({
    providedIn: 'root'
  })
  export class CampaignService {
    private baseUrl = `${environment.apiUrl}/campaign`;
    constructor(private http: HttpClient) { }

    // Lấy tất cả chiến dịch (endpoint: Get-all-campaigns)
    getAllCampaigns(): Observable<Campaign[]> {
      return this.http.get<Campaign[]>(`${this.baseUrl}/Get-all-campaigns`);
    }

    // Lấy chiến dịch theo ID (endpoint: Get-Campaign-by-Id?id=xx)
    getCampaignById(id: number): Observable<Campaign> {
      return this.http.get<Campaign>(`${this.baseUrl}/Get-Campaign-by-Id?id=${id}`);
    }

    // Tạo chiến dịch (endpoint: Add-campaign)
    createCampaign(campaign: Campaign): Observable<any> {
      return this.http.post(`${this.baseUrl}/Add-campaign`, campaign);
    }

    // Cập nhật chiến dịch (endpoint: Update-campaign/{id})
    updateCampaign(id: number, campaign: Campaign): Observable<any> {
      return this.http.put(`${this.baseUrl}/Update-campaign/${id}`, campaign);
    }

    // Xóa chiến dịch (endpoint: delete-campaign/{id})
    deleteCampaign(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete-campaign/${id}`);
    }

    // Ví dụ tìm kiếm theo tên nếu API hỗ trợ (nếu không, có thể bỏ qua)
    getCampaignsByName(name: string): Observable<Campaign[]> {
      return this.http.get<Campaign[]>(`${this.baseUrl}/Get-all-campaigns?name=${name}`);
    }
    uploadFile(file: File): Observable<{ fileUrl: string }> {
      const formData = new FormData();
      formData.append('file', file);
  
      // Gửi POST tới endpoint upload, backend trả về { fileUrl: '...' }
      return this.http.post<{ fileUrl: string }>(
        `${this.baseUrl}/upload`,
        formData
      );
    }
  }
