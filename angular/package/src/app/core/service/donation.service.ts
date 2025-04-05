import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DataResponse } from '../models/data-response.model';
import { Donation } from '../models/database/donation.model';

@Injectable({
  providedIn: 'root',
})
export class DonationService extends ApiService {
  constructor(protected override http: HttpClient) {
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
  createDonation(formData: any): Observable<DataResponse> {
    const url = `/api/Donation/Create-Donation`;
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



}