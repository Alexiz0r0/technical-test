import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { EditOrAddOrderComponent } from './pages/edit-or-add-order/edit-or-add-order.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { UpdateAddComponent } from './pages/update-add/update-add.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'my-orders',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'add-order/:id',
        component: EditOrAddOrderComponent,
      },
      {
        path: 'up-item/:id',
        component: UpdateAddComponent,
      },
      {
        path: '',
        redirectTo: '/my-orders',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
