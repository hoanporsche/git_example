import { Order } from './../order/order';
import { Item } from '../item/item';

export class Quantity {
  constructor(
    public quantityItemQuantity: number,
    public orderId: Order,
    public itemId: Item,
    public quantityId?: number,
  ) {}
}