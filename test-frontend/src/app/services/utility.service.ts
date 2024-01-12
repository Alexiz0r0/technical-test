import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  transformJson(original: any): any {
    const transformed: any = {
      id: original.id,
      numOrder: original.numOrder,
      cartList: original.cartList.map((item: any) => ({
        productId: item.productId,
        qty: item.qty,
      })),
    };

    return transformed;
  }

  updateQtyByProductId(
    cartItems: any[],
    productId: number,
    newQty: number
  ): void {
    const itemToUpdate = cartItems.find(
      (item: any) => item.productId === productId
    );

    if (itemToUpdate) {
      itemToUpdate.qty = newQty;
    }
  }

  updateQtyInCartList(order: any, updatedItem: any): any {
    const productIdToUpdate = updatedItem.productId;
    const newQty = Number(updatedItem.qty);

    const itemToUpdate = order.cartList.find(
      (item: any) => item.productId === productIdToUpdate
    );

    if (itemToUpdate) {
      itemToUpdate.qty = newQty;

      return order;
    }

    return null;
  }

  removeItemByProductId(order: any, productId: number): any {
    const itemIndex = order.cartList.findIndex(
      (item: any) => item.productId === productId
    );

    if (itemIndex !== -1) {
      order.cartList.splice(itemIndex, 1);

      return order;
    }

    return null;
  }

  addItemToCart(order: any, newItem: any): any {
    const productId = Number(newItem.productId);
    const qty = Number(newItem.qty);

    const existingItemIndex = order.cartList.findIndex(
      (item: any) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      order.cartList[existingItemIndex].qty += qty;
    } else {
      order.cartList.push({
        productId,
        qty,
      });
    }

    return order;
  }
}
