import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true, // <- importante
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss'], // <- corrigido
})
export class CheckoutComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  // Formulário do cliente
  customer = {
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit',
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  confirmPayment() {
    if (!this.customer.name || !this.customer.email || !this.customer.address) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Aqui você pode integrar com pagamento real ou mock
    console.log('Pagamento confirmado!', this.customer, this.cart);
    alert('Pagamento realizado com sucesso!');

    // Limpa carrinho
    this.cartService.clearCart();
    this.cart = [];
    this.total = 0;
  }
}
