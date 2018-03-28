import { Quantity } from './../quantity/quantity';
import { Store } from './../store/store';
import { OrderStatus } from '../order-status/order-status';

export class Order {
  constructor(
    public id?: number,
    public dateCreated?: Date,
    public dateDone?:Date,
    public nameCreated?: string,
    public phone?: string,
    public storeId?: Store,
    public statusId?: OrderStatus,
    public quantites?: Quantity[],
    public isShipping?: boolean,
    public addressShipping?: number,
    public shippingPrice?: number,
    public totalPrice?: number,
  ) {}
}