import { WorkingCalender } from './../working-calender/working-calender';
import { Store } from "../store/store";

export class Staff {
  constructor(
    public id?: number,
    public name?: string,
    public picture?: string,
    public storeId?: Store,
    public dateCreated?: Date,
    public dateUpdated?: Date,
    public phone?: string,
    public address?: string,
    public identityCard?: string,
    public homeTown?: string,
    public salary?: number,
    public workingCalenderId?: WorkingCalender,
    public enabled?: boolean,
  ) {}
}