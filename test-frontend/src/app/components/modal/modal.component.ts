import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { UtilityService } from '../../services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() addId: string = '';
  public modalService = inject(ModalService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private utilityService = inject(UtilityService);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private _characterId: number = 0;

  public products: any[] = [];
  public body: any;

  public modalForm: FormGroup = this.fb.group({
    productId: ['', Validators.required],
    qty: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^[1-9]\d*$/),
      ],
    ],
  });

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.addId.length > 0) {
      this._characterId = Number(
        this.addId.substring(0, this.addId.indexOf('-'))
      );
      this.getOrderById(this._characterId);
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      },
    });
  }

  saveInfo() {
    const newQty = this.modalForm.value;

    if (isNaN(this._characterId)) {
      this.firstOrderWithoutId(newQty);
    } else {
      this.updateOrderById(newQty);
    }
  }

  updateOrderById(newQty: any) {
    const updatedOrder = this.utilityService.addItemToCart(this.body, newQty);
    this.orderService.updateOrderById(updatedOrder.id, updatedOrder).subscribe({
      next: (resp) => {
        this.cerrarModal();
        this.modalService.updateChanges.emit(updatedOrder.id);
        this.showSuccessToast('Your product have been saved');
      },
    });
  }

  firstOrderWithoutId(newQty: any) {
    const qty = Number(newQty.qty);
    const productId = Number(newQty.productId);
    const body = {
      numOrder: 1,
      cartList: [{ productId, qty }],
    };

    this.orderService.addNewOrder(body).subscribe({
      next: (resp: any) => {
        this.cerrarModal();
        this.router.navigateByUrl(`/add-order/${resp.orderId}`);
        this.modalService.updateChanges.emit(resp.orderId);
        this.showSuccessToast('Your product have been saved');
      },
    });
  }

  getOrderById(id: number) {
    if (isNaN(id)) return;
    this.orderService.getOrderById(id).subscribe({
      next: (resp) => {
        this.body = this.utilityService.transformJson(resp);
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
