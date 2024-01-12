import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { UtilityService } from '../../services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent implements OnChanges {
  @Input() id: number = 0;
  @Input() productId: number = 0;
  @Input() productName: string = '';

  public modalService = inject(ModalService);
  private orderService = inject(OrderService);
  private utilityService = inject(UtilityService);
  private fb = inject(FormBuilder);

  public body: any;

  public modalForm: FormGroup = this.fb.group({
    product: ['', Validators.required],
    qty: [
      0,
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^[1-9]\d*$/),
      ],
    ],
  });

  ngOnChanges(changes: SimpleChanges): void {
    this.modalForm.reset({ product: this.productName });
    if (this.id > 0) {
      this.getOrderById(this.id);
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
  }

  saveInfo() {
    const newQty = Number(this.modalForm.get('qty')?.value);
    const updatedItem = { productId: this.productId, qty: newQty };

    const updatedOrder = this.utilityService.updateQtyInCartList(
      this.body,
      updatedItem
    );

    this.orderService.updateOrderById(this.id, updatedOrder).subscribe({
      next: (resp) => {
        this.cerrarModal();
        this.modalService.updateChanges.emit(this.id);
        this.showSuccessToast('Your changes have been saved');
      },
    });
  }

  getOrderById(id: number) {
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
