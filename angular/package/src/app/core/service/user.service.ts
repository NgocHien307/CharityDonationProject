import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Any, JsonConvert } from 'json2typescript';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DataResponse } from '../models/data-response.model';
import { Users } from '../models/database/db.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{

  constructor(protected override http : HttpClient) {
    super(http);
    const jsonConvert = new JsonConvert();
  }
  getListUser(): Observable<Users[]> {
    let url = `/api/user/get-all-user`;
    return super.get(url).pipe(
      map((res) => {
        console.log("API Response:", res);

        if (Array.isArray(res)) {
          return this.jsonConvert.deserializeArray(res, Users);
        }

        throw new Error("Dữ liệu từ API không hợp lệ!");
      })
    );
  }


  getUserbyId(idStaff: number): Observable<Users> {
    const url = `/api/user/get-user-by-id/${idStaff}`;
    return super.get(url).pipe(
      map((res) => {
        console.log("API Response:", res);

        if (res && typeof res === "object") {
          return this.jsonConvert.deserializeObject(res, Users);
        }

        throw new Error("Dữ liệu từ API không hợp lệ!");
      })
    );
  }

  UpdateUser(formData:any,id: any): Observable<DataResponse> {

    let url = `/api/user/update-user`;
    return super.putEntity(url,id, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );

  }
  RolPermission(formData:any,id: any): Observable<DataResponse> {

    let url = `/api/user/assign-role`;
    return super.putEntity(url,id, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );

  }

}
