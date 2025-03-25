import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "https://localhost:7204/api";
  readonly PhotoUrl = "https://localhost:7204/api";

  constructor(private http:HttpClient) { }
   
  CampaignList(val:any){
    return this.http.get<any>(this.APIUrl+'campaign/Get-all-campaigns');
  }

}
