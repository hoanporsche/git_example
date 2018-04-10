import { Material } from './../material/material';
import { Category } from './../category/category';

export class Item{
  constructor(
    public id?: number,
    public name?: number,
    public picture?: string,
    public categoryId?: Category,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public singleValue?: number,
    public enbled?: boolean,
    public materials?: Material[],
    public description?: string,
  ) {}
}