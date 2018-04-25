import { Order } from './../order/order';
import { Item } from '../item/item';

export class Quantity {
  constructor(
    public id?: number,
    public itemId?: Item,
    public quantity?: number,
    public orderId?: Order,
  ) {}
}