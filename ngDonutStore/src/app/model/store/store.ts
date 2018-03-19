
export class Store {
  constructor(
    public storeName: string,
    public storePicture: string,
    public storePhoneNumber: string,
    public storeAddress: string,
    public storeEnbale: boolean,
    public storeId?: number,
    public storeDateCreated?: Date,
    public storeDateUpdated?: Date,
  ) {}
}