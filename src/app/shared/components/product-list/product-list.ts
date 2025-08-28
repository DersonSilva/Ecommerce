import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { SearchBarComponent } from '../search-bar/search-bar';
import { RouterModule } from '@angular/router';

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

  constructor(private productService: ProductService) {}

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

  get filteredProducts(): Product[] {
    if (!this.searchTerm) return this.products;
    return this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  translate(text: string): string {
    const dict: Record<string, string> = {
      Smartphone: 'Celular',
      Laptop: 'Notebook',
      'great product': 'ótimo produto',
    };

    // percorre cada chave e substitui se encontrar
    Object.keys(dict).forEach((key) => {
      if (text.includes(key)) {
        text = text.replace(key, dict[key]);
      }
    });

    return text;
  }
}
