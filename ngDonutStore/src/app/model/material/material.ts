import { Supply } from './../supply/supply';

export class Material {
  constructor(
    public id?: number,
    public name?: string,
    public picture?: string,
    public supplyId?: Supply,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public singleValue?: number,
    public enbled?: boolean,
  ) {}
}