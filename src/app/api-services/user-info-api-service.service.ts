import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodInfoApiServiceService {
  readonly userApiUrl = 'http://localhost:5117/UserInfo/';

  constructor(private http: HttpClient) { }


  // UserInfo
  getUserInfos(): Observable<any[]> {
    return this.http.get<any[]>(this.userApiUrl + 'GetUserInfos');
  }

  postUserInfo(userInfo: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.userApiUrl + 'PostUserInfo', userInfo, httpOptions);
  }

  putUserInfo(userInfo: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.userApiUrl + 'putUserInfo', userInfo, httpOptions);
  }

  deleteUserInfo(userId: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.userApiUrl + 'deleteUserInfo/' + userId, httpOptions);
  }
}
