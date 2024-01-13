import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { EditOrAddOrderComponent } from './pages/edit-or-add-order/edit-or-add-order.component';
import { HeaderComponent } from './shared/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './pages/products/products.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UpdateAddComponent } from './pages/update-add/update-add.component';

@NgModule({
  declarations: [
    AppComponent,
    EditModalComponent,
    EditOrAddOrderComponent,
    HeaderComponent,
    ModalComponent,
    NotFoundComponent,
    OrdersComponent,
    PagesComponent,
    ProductsComponent,
    SidebarComponent,
    LoadingComponent,
    UpdateAddComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
