import { Component, OnInit, inject } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private orderService = inject(ProductService);

  public products: any[] = [];

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      },
    });
  }
}
