import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }

  deleteOrderById(id: number): Observable<boolean> {
    return this.http
      .delete(`${this.baseUrl}/order/${id}`)
      .pipe(map(() => true));
  }

  addNewOrder(order: any) {
    return this.http.post(`${this.baseUrl}/add-order`, order);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/order/${id}`);
  }

  updateOrderById(id: number, order: any) {
    const url = `${this.baseUrl}/update-order/${id}`;
    return this.http.put(url, order);
  }
}
