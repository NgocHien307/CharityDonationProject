import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DataResponse } from '../models/data-response.model';
import { Donation } from '../models/database/donation.model';
import { DonationResponse } from '../models/database/donation-response.model';
import { Router } from '@angular/router';  // Thêm import Router

@Injectable({
  providedIn: 'root',
})
export class DonationService extends ApiService {
  constructor(
    protected override http: HttpClient,
    private router: Router // Inject Router vào constructor
  ) {
    super(http);
    const jsonConvert = new JsonConvert();
  }

  // Lấy tất cả các khoản quyên góp
  getAllDonations(): Observable<Donation[]> {
    const url = `/api/Donation/Get-all-Donation`;
    return super.get(url).pipe(
      map((res) => {
        console.log('API Response:', res);

        if (Array.isArray(res)) {
          return this.jsonConvert.deserializeArray(res, Donation);
        }

        throw new Error('Dữ liệu từ API không hợp lệ!');
      })
    );
  }

  // Lấy một khoản quyên góp theo ID
  getDonationById(id: number): Observable<Donation> {
    const url = `/api/Donation/Get-DonationById/${id}`;
    return super.get(url).pipe(
      map((res) => {
        console.log('API Response:', res);

        if (res && typeof res === 'object') {
          return this.jsonConvert.deserializeObject(res, Donation);
        }

        throw new Error('Dữ liệu từ API không hợp lệ!');
      })
    );
  }

  // Lấy danh sách khoản quyên góp theo CampaignId
  getDonationsByCampaignId(campaignId: number): Observable<Donation[]> {
    const url = `/api/Donation/Get-Donation/campaign/${campaignId}`;
    return super.get(url).pipe(
      map((res) => {
        console.log('API Response:', res);

        if (Array.isArray(res)) {
          return this.jsonConvert.deserializeArray(res, Donation);
        }

        throw new Error('Dữ liệu từ API không hợp lệ!');
      })
    );
  }

  // Tạo mới một khoản quyên góp
  createDonation(formData: any): Observable<DonationResponse> {
    const url = `/api/Payment/create-payment`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  // Lấy tổng số tiền đã donate cho một Campaign
  getTotalDonationByCampaign(campaignId: number): Observable<number> {
    const url = `/api/Donation/campaign/${campaignId}/total-donations`;
    return super.get(url).pipe(
      map((res: any) => {
        console.log('Total Donation for Campaign:', res);
        return res.total;
      })
    );
  }

  // Lấy tổng số tiền mà một user đã donate
  getTotalDonationByUser(userId: number): Observable<number> {
    const url = `/api/Donation/user/${userId}/total`;
    return super.get(url).pipe(
      map((res: any) => {
        console.log('Total Donation by User:', res);
        return res.total;
      })
    );
  }

  // Lấy tổng số tiền mà user đã donate cho một campaign cụ thể
  getTotalDonationByUserForCampaign(userId: number, campaignId: number): Observable<number> {
    const url = `/api/Donation/user/${userId}/campaign/${campaignId}/total`;
    return super.get(url).pipe(
      map((res: any) => {
        console.log('User Donation for Campaign:', res);
        return res.totalDonated;
      })
    );
  }

  // Lấy link thanh toán
  getPaymentLink(donationId: number): Observable<string> {
    const url = `/api/Donation/Get-Payment-Link/${donationId}`;
    return super.get(url).pipe(
      map((res: any) => {
        console.log('Payment Link for Donation:', res);

        // Giả sử API trả về đối tượng có chứa URL thanh toán
        if (res && res.paymentLink) {
          return res.paymentLink; // Trả về link thanh toán
        }

        throw new Error('Dữ liệu từ API không hợp lệ!');
      }),
      catchError((err) => throwError(() => new Error(err)))
    );
  }

  // Xử lý callback thanh toán
  handlePaymentCallback(response: any): void {
    if (response.success) {
      // Thanh toán thành công, điều hướng đến trang cảm ơn
      this.router.navigate([response.redirectUrl]);  // Điều hướng đến trang home hoặc trang cảm ơn
      alert(response.message);  // Hiển thị thông báo thành công
    } else {
      // Thanh toán không thành công, có thể chuyển hướng sang trang lỗi hoặc hiển thị thông báo
      alert('Thanh toán không thành công!');
    }
  }
}
