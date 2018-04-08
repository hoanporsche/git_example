import { TimekeepingStatus } from './../timekeeping-status/timekeeping-status';
import { Staff } from "../staff/staff";

export class Timekeeping {
  constructor(
    public id?: number,
    public staffId?: Staff,
    public dateCreated?: Date,
    public timeIn?: Date,
    public timeOut?: Date,
    public statusId?: TimekeepingStatus,
  ) {}
}