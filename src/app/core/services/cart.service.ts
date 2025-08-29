import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  private cart: any[] = [];

  // BehaviorSubject para reatividade
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    this.cartSubject.next(this.cart); // atualiza os assinantes
  }

  private loadCart() {
    const data = localStorage.getItem(this.storageKey);
    this.cart = data ? JSON.parse(data) : [];
    this.cartSubject.next(this.cart); // atualiza os assinantes
  }

  getCart() {
    return this.cart;
  }

  addProduct(product: any) {
    const index = this.cart.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      this.cart[index].quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  removeProduct(productId: number) {
    this.cart = this.cart.filter((p) => p.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find((p) => p.id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
