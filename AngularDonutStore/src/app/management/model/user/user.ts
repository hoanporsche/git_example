import { Store } from "../store/store";
import { Role } from "../role/role";

export class User {
  constructor(
    public id?: number,
    public email?: string,
    public password?: string,
    public picture?: string,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public enabled?: boolean,
    public roles?: Role[],
    public storeId?: Store
  ) {}
}