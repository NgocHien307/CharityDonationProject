import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Creator {
  id: number;
  name: string;
  description?: string;
  logoUrl?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  isVerified?: boolean;
  type: string; // "Individual", "Organization", ...
  userId?: number;
  verificationDocumentUrl?: string;
  verificationDate?: Date;
}

@Injectable({ providedIn: 'root' })
export class CreatorService {
  constructor(private http: HttpClient) {}
  getAllCreators(): Observable<Creator[]> {
    return this.http.get<Creator[]>(environment.apiUrl + '/api/creator/get-all-creators');
}
}
