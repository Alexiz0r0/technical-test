import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  public orders: any[] = [];
  public loading: boolean = true;

  ngOnInit(): void {
    localStorage.removeItem('title');
    localStorage.removeItem('selectedOrder');
    this.getOrders();
  }

  getOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (resp) => {
        this.orders = resp;
        this.loading = false;
      },
    });
  }

  onDeleteOrder(id: number) {
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
        this.orderService.deleteOrderById(id).subscribe({
          next: () => {
            this.getOrders();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your order has been deleted.',
              icon: 'success',
            });
          },
        });
      }
    });
  }

  onNewOrder() {
    localStorage.setItem('title', 'Add Order');
  }
  onEditOrder(id: number) {
    localStorage.setItem('title', 'Edit Order');
    this.uploadOrder(id);
  }

  uploadOrder(id: number) {
    this.orderService.getOrderById(id).subscribe({
      next: (resp) => {
        localStorage.setItem('selectedOrder', JSON.stringify(resp));
      },
    });
  }
}
