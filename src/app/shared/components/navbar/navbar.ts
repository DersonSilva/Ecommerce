import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribing ao BehaviorSubject para updates em tempo real
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }
}
