import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe({
      next: (prod) => {
        // Traduzir descrição para PT
        this.product = {
          ...prod,
          description: this.translateDescription(prod.description),
        };
      },
      error: (err) => console.error('Erro ao buscar produto', err),
    });
  }

  translateDescription(desc: string): string {
    // Aqui você pode criar seu mapeamento ou tradução automática simples
    // Exemplo simples:
    if (desc.includes('example')) return 'Produto de exemplo traduzido para PT';
    return desc; // Se não houver tradução, mantém original
  }

  comprarAgora() {
    if (this.product) {
      this.cartService.addProduct(this.product); // adiciona ao carrinho
      this.router.navigate(['/checkout']); // redireciona para checkout
    }
  }
}
