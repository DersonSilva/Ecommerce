import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiURL = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // getAllProducts(): Observable<Product[]> {
  //   return this.http.get<{ products: Product[] }>(this.apiURL).pipe(
  //     map((response) => response.products) // <- pega só a lista
  //   );
  // }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(`${this.apiURL}?limit=10`)
      .pipe(map((response) => response.products));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }
}
