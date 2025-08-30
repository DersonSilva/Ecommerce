import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { SearchBarComponent } from '../search-bar/search-bar';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service'; // <-- importa aqui

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';
  searchTerm: string = '';

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar produtos';
        this.loading = false;
      },
    });
  }

  get filteredForList(): Product[] {
    return this.products;
  }

  get filteredForDropdown(): Product[] {
    if (!this.searchTerm || this.searchTerm.length < 1) return [];
    return this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    console.log(`${product.title} adicionado ao carrinho!`);

    // Navega para a tela de carrinho
    this.router.navigate(['/cart']);
  }

  goToProduct(product: Product) {
    // Navega para a página de detalhes do produto
    this.router.navigate(['/product', product.id]);

    // Limpa a pesquisa e o dropdown
    this.searchTerm = '';
  }

  translate(text: string): string {
    const dict: Record<string, string> = {
      Smartphone: 'Celular',
      Laptop: 'Notebook',
      'great product': 'ótimo produto',
    };

    Object.keys(dict).forEach((key) => {
      if (text.includes(key)) {
        text = text.replace(key, dict[key]);
      }
    });

    return text;
  }
}
