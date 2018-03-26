import { Category } from './../category/category';

export class Item{
  constructor(
    public itemName: number,
    public itemPicture: string,
    public itemCategory: Category,
    public itemSingleValue: number,
    public itemId?: number,
    public itemEnbled?: boolean,
    public itemDateCreated?: Date,
    public itemDateUpdated?: Date,
  ) {}
}