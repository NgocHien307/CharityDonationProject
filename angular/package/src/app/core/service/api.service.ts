import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { JsonConvert } from 'json2typescript';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLogged } from '../utils/user-logged';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected jsonConvert: JsonConvert;
  protected changeDetectorRef: ChangeDetectorRef | undefined;

  constructor(protected http: HttpClient) {
    this.jsonConvert = new JsonConvert();
  }

  /**
   * Hàm xử lý lỗi chung.
   */
  private formatErrors(error: any) {
    return throwError(() => error);
  }

  /**
   * Hàm lấy "Headers mặc định" (bao gồm Authorization nếu user đã đăng nhập).
   */
  protected getHeaders(): { [header: string]: string } {
    const headers: any = {
      Accept: 'application/json',
      // Nếu bạn thường dùng JSON, ta có thể để luôn Content-Type: application/json
      // 'Content-Type': 'application/json'
    };

    // Kiểm tra token
    const userLogged = new UserLogged();
    if (userLogged.isLogged()) {
      headers['Authorization'] = 'Bearer ' + userLogged.getToken();
    }
    return headers;
  }

  //=================== PHẦN HÀM CRUD CHUNG ===================//

  /**
   * GET
   * @param url  đường dẫn (sau environment.apiUrl)
   * @param params  query params
   * @param extraHeaders headers bổ sung (nếu cần)
   */
  protected get(
    url: string,
    params?: any,
    extraHeaders?: { [header: string]: string }
  ): Observable<any> {
    // Gộp headers mặc định + headers bổ sung
    const mergedHeaders = { ...this.getHeaders(), ...(extraHeaders || {}) };

    const options = {
      headers: new HttpHeaders(mergedHeaders),
      params: params ? new HttpParams({ fromObject: params }) : undefined
    };
    return this.http
      .get(environment.apiUrl + url, options)
      .pipe(catchError(this.formatErrors));
  }

  /**
   * POST
   * @param url
   * @param body
   * @param contentType
   * @param extraHeaders headers bổ sung (nếu cần)
   */
  protected post(
    url: string,
    body: any,
    contentType: string = 'application/json',
    extraHeaders?: { [header: string]: string }
  ): Observable<any> {
    const mergedHeaders = {
      ...this.getHeaders(),
      'Content-Type': contentType,
      ...(extraHeaders || {})
    };

    const options = {
      headers: new HttpHeaders(mergedHeaders)
    };
    return this.http
      .post(environment.apiUrl + url, body, options)
      .pipe(catchError(this.formatErrors));
  }

  /**
   * PUT
   */
  protected put(
    url: string,
    body: any,
    contentType: string = 'application/json',
    extraHeaders?: { [header: string]: string }
  ): Observable<any> {
    const mergedHeaders = {
      ...this.getHeaders(),
      'Content-Type': contentType,
      ...(extraHeaders || {})
    };
    const options = {
      headers: new HttpHeaders(mergedHeaders)
    };
    return this.http
      .put(environment.apiUrl + url, body, options)
      .pipe(catchError(this.formatErrors));
  }

  /**
   * PATCH
   */
  protected patch(
    url: string,
    body: any,
    contentType: string = 'application/json',
    extraHeaders?: { [header: string]: string }
  ): Observable<any> {
    const mergedHeaders = {
      ...this.getHeaders(),
      'Content-Type': contentType,
      ...(extraHeaders || {})
    };
    const options = {
      headers: new HttpHeaders(mergedHeaders)
    };
    return this.http
      .patch(environment.apiUrl + url, body, options)
      .pipe(catchError(this.formatErrors));
  }

  /**
   * DELETE
   */
  protected delete(
    url: string,
    extraHeaders?: { [header: string]: string }
  ): Observable<any> {
    const mergedHeaders = {
      ...this.getHeaders(),
      ...(extraHeaders || {})
    };
    const options = {
      headers: new HttpHeaders(mergedHeaders)
    };
    return this.http
      .delete(environment.apiUrl + url, options)
      .pipe(catchError(this.formatErrors));
  }

  //================== PHẦN ENTITY CỤ THỂ (NẾU CẦN) ===================//

  /**
   * postEntity
   * Sử dụng khi bạn muốn tách logic: thay vì post(url, ...),
   * bạn dùng postEntity(entitySet, body).
   */
  protected postEntity(entitySet: string, body: Object = {}): Observable<any> {
    return this.post(entitySet, body); // Gọi hàm post phía trên
  }

  protected putEntity(entitySet: string, id: number, body: Object = {}): Observable<any> {
    return this.put(`${entitySet}/${id}`, body);
  }

  protected patchEntity(entitySet: string, id: number, body: Object = {}): Observable<any> {
    return this.patch(`${entitySet}/${id}`, body);
  }

  protected deleteEntity(entitySet: string): Observable<any> {
    return this.delete(entitySet);
  }
}
