import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CampaignSubscriptionService {
  private apiUrl = 'https://localhost:7204/api/campaigns';

  constructor(private http: HttpClient) {}

  followCampaign(userId: number, campaignId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/follow`, { userId, campaignId });
  }

  unfollowCampaign(userId: number, campaignId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/unfollow`, { userId, campaignId });
  }

  isUserFollowingCampaign(userId: number, campaignId: number): Observable<{ isFollowing: boolean }> {
    return this.http.get<{ isFollowing: boolean }>(`${this.apiUrl}/is-following`, {
      params: {
        userId: userId.toString(),
        campaignId: campaignId.toString()
      }
    });
  }

  getUserFollowedCampaigns(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user-following/${userId}`);
  }
}
