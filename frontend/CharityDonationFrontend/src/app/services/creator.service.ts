import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Creator {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
      private baseUrl = `${environment.apiUrl}/creators`;

  constructor(private http: HttpClient) {}

  getAllCreators(): Observable<Creator[]> {
    return this.http.get<Creator[]>(`${this.baseUrl}/Get-all-creators`);
  }

  getCreatorById(id: number): Observable<Creator> {
    return this.http.get<Creator>(`${this.baseUrl}/Get-creator-by-Id?id=${id}`);
  }
}
