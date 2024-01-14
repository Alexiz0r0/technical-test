import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { OrderService } from '../../services/order.service';
import { UtilityService } from '../../services/utility.service';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-edit-or-add-order',
  templateUrl: './edit-or-add-order.component.html',
})
export class EditOrAddOrderComponent
  implements OnInit, OnDestroy, AfterContentInit
{
  private modalService = inject(ModalService);
  private orderService = inject(OrderService);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private utilityService = inject(UtilityService);

  public title: string = '';
  public loading: boolean = true;

  public order: any;
  public body: any;

  public id: number = 0;
  public addId: string = '';

  public productId: number = 0;
  public productName: string = '';
  public newOrderStr: string = '';

  private _tagOrder: any;
  private _tagBtnSave: boolean = false;

  public orderForm: FormGroup = this.fb.group({
    numOrder: [0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    finalPrice: [0],
    numProducts: [0],
    date: [''],
  });

  ngOnInit(): void {
    this.loading = true;
    if (!localStorage.getItem('title')) return;
    this.title = localStorage.getItem('title')!;
    this.modalService.updateChanges.pipe(delay(250)).subscribe({
      next: (id) => {
        this.uploadOrder(id);
      },
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this.uploadOrder(id);
    });
  }
  ngAfterContentInit(): void {
    this.loading = false;
  }

  ngOnDestroy(): void {
    const contieneEdit = this.title.includes('Edit');
    const contieneAdd = this.title.includes('Add');
    if (!this._tagBtnSave && contieneEdit) {
      this.backupOrder();
    } else if (!this._tagBtnSave && contieneAdd) {
      this.cleanAddOrder();
    }
  }

  backupOrder() {
    if (!localStorage.getItem('selectedOrder')) return;
    this._tagOrder = JSON.parse(localStorage.getItem('selectedOrder')!);

    const oldOrder = this.utilityService.transformJson(this._tagOrder);
    this.orderService.updateOrderById(oldOrder.id, oldOrder).subscribe();
  }

  cleanAddOrder() {
    if (this.order?.id !== undefined) {
      this.orderService.deleteOrderById(this.order.id).subscribe();
    }
  }

  openModal() {
    this.generateOrderNumber();
    if (this.order) {
      this.addId = `${this.order.id}-${uuid()}`;
    } else {
      this.addId = `n-${uuid()}`;
    }
    this.modalService.abrirModal();
  }

  generateOrderNumber() {
    const numOrder = this.orderForm.controls['numOrder'].value;
    this.newOrderStr = `${numOrder}-${uuid()}`;
  }

  openEditModal(id: number, productId: number, productName: string) {
    this.id = id;
    this.productId = productId;
    this.productName = productName;
    this.modalService.openEditModal();
  }

  uploadOrder(id: number) {
    if (isNaN(id)) return;

    this.orderService.getOrderById(id).subscribe({
      next: (resp) => {
        this.order = resp;
        this.body = this.utilityService.transformJson(resp);
        this.uploadForm(resp);
      },
      error: () => {
        this.router.navigateByUrl('/not-found');
      },
    });
  }

  uploadForm(order: any) {
    this.orderForm.reset({
      numOrder: order.numOrder,
      finalPrice: order.finalPrice,
      numProducts: order.cartList.length,
      date: order.date,
    });
  }

  onDeleteProductById(id: number, productId: number) {
    const updatedOrder = this.utilityService.removeItemByProductId(
      this.body,
      productId
    );

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
        this.orderService.updateOrderById(id, updatedOrder).subscribe({
          next: () => {
            this.uploadOrder(id);
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

  saveInfo() {
    this._tagBtnSave = true;
    this.router.navigateByUrl('/my-orders');
  }
}
