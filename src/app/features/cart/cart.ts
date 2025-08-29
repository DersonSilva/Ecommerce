import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common'; // <- importante
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
  imports: [CommonModule, RouterModule],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  increase(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.loadCart();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
      this.loadCart();
    }
  }

  remove(item: any) {
    this.cartService.removeProduct(item.id);
    this.loadCart();
  }

  goToCheckout() {
    this.router.navigate(['/checkout']); // <-- navega para a tela de checkout
  }
}
