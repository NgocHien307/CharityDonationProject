import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { JsonConvert } from 'json2typescript';
import { Campaign } from '../models/database/campaign.model'; 
import { DataResponse } from '../models/data-response.model'; 

@Injectable({ providedIn: 'root' })
export class CampaignService extends ApiService {

  constructor(protected override http: HttpClient) {
    super(http);
    const jsonConvert = new JsonConvert();  
}

  getAllCampaigns(): Observable<Campaign[]> {
    const url = '/api/campaign/Get-all-campaigns';
    return this.get(url).pipe(
      map(res => {
        if (Array.isArray(res)) {
          return this.jsonConvert.deserializeArray(res, Campaign);
        }
        throw new Error('API trả về không phải mảng');
      }),
      catchError(err => throwError(() => new Error(err)))
    );
  }

  getCampaignById(id: number): Observable<Campaign> {
    const url = `/api/campaign/Get-Campaign-by-Id?id=${id}`;
    return this.get(url).pipe(
      map(res => {
        return this.jsonConvert.deserializeObject(res, Campaign);
      }),
      catchError(err => throwError(() => new Error(err)))
    );
  }

  createCampaign(campaign: Campaign): Observable<any> {
    return super.post('/api/campaign/Add-campaign', campaign);
  }

  updateCampaign(id: number, campaign: Campaign): Observable<any> {
    return super.put(`/api/campaign/Update-campaign/${id}`, campaign);
  }

  deleteCampaign(id: number): Observable<any> {
    return super.delete(`/api/campaign/delete-campaign/${id}`);
  }

  searchCampaignsByTitle(query: string): Observable<Campaign[]> {
    const url = `/api/campaign/search?title=${query}`;
    return this.get(url).pipe(
      map(res => {
        if (Array.isArray(res)) {
          return this.jsonConvert.deserializeArray(res, Campaign);
        }
        throw new Error('API trả về không phải mảng');
      }),
      catchError(err => throwError(() => new Error(err)))
    );
  }
}
  