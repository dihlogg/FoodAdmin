import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodInfoApiServiceService {
  readonly foodApiUrl = 'http://localhost:5117/FoodInfo/';

  constructor(private http: HttpClient) { }

  // FoodInfo
  getFoodInfos(): Observable<any[]> {
    return this.http.get<any[]>(this.foodApiUrl + 'GetFoodInfos');
  }

  postFoodInfo(foodInfo: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.foodApiUrl + 'PostFoodInfo', foodInfo, httpOptions);
  }

  putFoodInfo(foodInfo: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.foodApiUrl + 'PutFoodInfo', foodInfo, httpOptions);
  }

  deleteFoodInfo(foodId: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.foodApiUrl + 'DeleteFoodInfo/' + foodId, httpOptions);
  }
}
