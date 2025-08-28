// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './shared/components/product-list/product-list';
import { ProductDetailsComponent } from './shared/components/product-details/product-details';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];
