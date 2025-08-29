import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import './twind-setup';

import { ProductListComponent } from './app/shared/components/product-list/product-list';
import { ProductDetailsComponent } from './app/shared/components/product-details/product-details';
import { CartComponent } from './app/features/cart/cart';
import { CheckoutComponent } from './app/features/checkout/checkout';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ProductListComponent }, // rota raiz
      { path: 'product/:id', component: ProductDetailsComponent }, // detalhes
      { path: 'cart', component: CartComponent }, // ⬅ rota para o carrinho
      { path: 'checkout', component: CheckoutComponent },
    ]),
  ],
});
