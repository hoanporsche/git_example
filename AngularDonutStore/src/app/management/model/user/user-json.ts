
export class UserJson {
  constructor(
    public email?: string,
    public picture?: string,
    public senderName?: string,
    public roles?: string[],
    public storeId?: number
  ) {}
}