import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JsonConvert } from 'json2typescript';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ApiService {

  constructor(protected override http: HttpClient) {
    super(http);
    const jsonConvert = new JsonConvert();
   }

  Login(formData : any): Observable<any> {
    let url = `/api/auth/Login`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
}
