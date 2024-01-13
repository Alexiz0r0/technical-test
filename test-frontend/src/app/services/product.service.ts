import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = environments.baseUrl;

  private http = inject(HttpClient);

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  deleteProductById(id: number): Observable<boolean> {
    return this.http
      .delete(`${this.baseUrl}/product/${id}`)
      .pipe(map(() => true));
  }

  addNewProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/product`, product);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/${id}`);
  }

  updateProductById(order: any): Observable<any> {
    const url = `${this.baseUrl}/product`;
    return this.http.put<any>(url, order);
  }
}
