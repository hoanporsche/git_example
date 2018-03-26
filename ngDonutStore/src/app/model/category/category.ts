
export class Category {
  constructor(
    public categoryName: string,
    public categoryId?: number,
    public categoryEnabled?: boolean,
    public categoryDateCreated?: Date,
    public categoryDateUpdated?: Date,
  ) {}
}