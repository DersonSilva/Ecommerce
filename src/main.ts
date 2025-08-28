import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import './twind-setup';

import { ProductListComponent } from './app/shared/components/product-list/product-list';
import { ProductDetailsComponent } from './app/shared/components/product-details/product-details';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ProductListComponent }, // rota raiz
      { path: 'product/:id', component: ProductDetailsComponent }, // detalhes
    ]),
  ],
});
