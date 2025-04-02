import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Partner {
  id: number;
  name: string;
  description: string;
  subDescription: string;
  logoUrl: string;
  email: string;
  phoneNumber: string;
  address: string;
  isVerified: boolean;
  type: string;
  campaigns: any[];
  verificationDocumentUrl: string;
  verificationDate: string;
}

@Injectable({ providedIn: 'root' })
export class PartnerService {

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(environment.apiUrl + '/api/user/get-all-partner');
  }

  getPartnerById(id: string): Observable<Partner> {
    const url = `${environment.apiUrl + "/api/user/get-partner-by-id"}/${id}`;
    return this.http.get<Partner>(url);
  }

  
}