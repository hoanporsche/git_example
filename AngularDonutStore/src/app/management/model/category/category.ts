import { Item } from './../item/item';

export class Category {
  constructor(
    public id?: number,
    public name?: string,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public enabled?: boolean,
    public items?: Item[],
  ) {}
}