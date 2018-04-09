
export class Store {
  constructor(
    public id?: number,
    public name?: string,
    public picture?: string,
    public phone?: string,
    public address?: string,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public enabled?: boolean,
  ) {}
}