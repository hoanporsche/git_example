import { Quantity } from './../quantity/quantity';
import { Store } from './../store/store';
import { OrderStatus } from '../order-status/order-status';

export class Order {
  constructor(
    public orderNameCreated: string,
    public orderPhoneNumber: string,
    public storeId: Store,
    public orderStatus: OrderStatus,
    public quantites: Quantity[],
    public orderIsShipping: boolean,
    public orderShippingPrice: number,
    public orderTotalPrice: number,
    public orderId?: number,
    public orderDateCreated?: Date,
    public orderDateDone?:Date,
  ) {}
}