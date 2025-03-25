import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Category {
  id: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:7204/api/campaign/Get-all-Category'; 

  constructor(private http: HttpClient) {}

  getCategoryCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}