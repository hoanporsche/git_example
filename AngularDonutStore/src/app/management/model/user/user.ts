import { Store } from "../store/store";
import { Role } from "../role/role";

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public password?: string,
    public phone?: string,
    public address?: string,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public lastOrderTime?: Date,
    public enabled?: boolean,
    public credentialsexpired?: boolean,
    public expired?: boolean,
    public locked?: boolean,
    public userStore?: Store,
    public roles?: Role[],
    public storeId?: Store
  ) {}
}