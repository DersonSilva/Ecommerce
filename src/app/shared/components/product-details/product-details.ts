import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
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
  productImages: string[] = [];
  selectedImage?: string;
  imageModalOpen = false;
  modalImage = '';

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.productId) {
      this.error = 'Produto inválido';
      this.loading = false;
      return;
    }

    this.productService.getProductById(this.productId).subscribe({
      next: (prod) => {
        this.product = {
          ...prod,
          description: this.translateDescription(prod.description),
        } as Product;

        const imgs = (prod as any).images || (prod as any).image || [];
        this.productImages =
          Array.isArray(imgs) && imgs.length ? imgs : prod.thumbnail ? [prod.thumbnail] : [];
        this.selectedImage = this.productImages[0] || this.product?.thumbnail;

        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar produto', err);
        this.error = 'Erro ao carregar produto';
        this.loading = false;
      },
    });
  }

  openImageModal(url: string) {
    if (!url) return;
    this.modalImage = url;
    this.imageModalOpen = true;
  }

  closeImageModal() {
    this.imageModalOpen = false;
    this.modalImage = '';
  }

  setSelectedImage(url: string) {
    this.selectedImage = url;
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    console.log(`${product.title} adicionado ao carrinho!`);
    this.router.navigate(['/cart']);
  }

  comprarAgora() {
    const p = this.product;
    if (!p) return;
    this.cartService.addProduct(p);
    this.router.navigate(['/checkout']);
  }

  translateDescription(desc: string): string {
    if (!desc) return '';
    if (desc.includes('example')) return 'Produto de exemplo (traduzido)';
    return desc;
  }
}
