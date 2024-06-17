import { UserComponent } from './../user/user.component';
import { User } from './../user/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodInfoApiServiceService {
  readonly cartApiUrl = 'http://localhost:5117/CartInfo/';

  constructor(private http: HttpClient) { }

  // CartInfo
  getCartInfos(): Observable<any[]> {
    return this.http.get<any[]>(this.cartApiUrl + 'GetCartInfos');
  }

  postCartInfo(cartInfo: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.cartApiUrl + 'PostCartInfo', cartInfo, httpOptions);
  }

  putCartInfo(cartInfo: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.cartApiUrl + 'PutCartInfo', cartInfo, httpOptions);
  }

  deleteCartInfo(cartId: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.cartApiUrl + 'DeleteCartInfo/' + cartId, httpOptions);
  }

  // Transactions
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.cartApiUrl + 'GetAllTransactions');
  }

  // Update Status
  updateStatusCartInfo(cartInfo: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.cartApiUrl + 'UpdateStatusCartInfo', cartInfo, httpOptions);
  }
}
