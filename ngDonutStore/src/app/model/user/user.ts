import { Store } from "../store/store";
import { Role } from "../role/role";

export class User {
  constructor(
    public userId?: number,
    public userName?: string,
    public userEmail?: string,
    public userPassword?: string,
    public userPhoneNumber?: string,
    public userAddress?: string,
    public userDateCreated?: Date,
    public userDateUpdated?: Date,
    public userLastOrderTime?: Date,
    public enabled?: boolean,
    public credentialsexpired?: boolean,
    public expired?: boolean,
    public locked?: boolean,
    public userStore?: Store,
    public roles?: Role[],
  ) {}
}