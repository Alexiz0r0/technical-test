import { Component, OnInit, inject } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);

  public products: any[] = [];
  public loading: boolean = true;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
        this.loading = false;
      },
    });
  }

  onDeleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe({
          next: () => {
            this.getProducts();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your product has been deleted.',
              icon: 'success',
            });
          },
        });
      }
    });
  }
}
