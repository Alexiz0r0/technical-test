import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-add',
  templateUrl: './update-add.component.html',
})
export class UpdateAddComponent implements OnInit, AfterContentInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  public title: string = 'Add Product';
  public loading: boolean = true;
  public product: any;

  public productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    availableQty: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^[1-9]\d*$/),
      ],
    ],
    price: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^[1-9]\d*$/),
      ],
    ],
  });

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(({ id }) => {
      this.uploadProduct(id);
    });
  }
  ngAfterContentInit(): void {
    this.loading = false;
  }

  uploadProduct(id: number) {
    if (isNaN(id)) return;

    this.productService.getProductById(id).subscribe({
      next: (resp) => {
        this.product = resp;
        this.title = 'Edit Product';
        const { name, availableQty, price } = resp;
        this.productForm.reset({ name, availableQty, price });
      },
      error: () => {
        this.router.navigateByUrl('/not-found');
      },
    });
  }

  saveInfo() {
    if (this.productForm.pristine) {
      this.showSuccessToast('Your product have been saved');
      this.router.navigateByUrl('/products');
      return;
    }
    if (this.title.includes('Edit')) {
      this.updateProductById();
    } else {
      this.addNewProduct();
    }
  }

  updateProductById() {
    if (!this.product.id) return;
    const { name, availableQty, price } = this.productForm.value;
    const body = {
      id: this.product.id,
      name,
      availableQty,
      price,
    };
    this.productService.updateProductById(body).subscribe({
      next: () => {
        this.showSuccessToast('Your product have been saved');
        this.router.navigateByUrl('/products');
      },
    });
  }

  addNewProduct() {
    this.productService.addNewProduct(this.productForm.value).subscribe({
      next: () => {
        this.showSuccessToast('Your product have been saved');
        this.router.navigateByUrl('/products');
      },
    });
  }

  showSuccessToast(message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: message,
    });
  }
}
