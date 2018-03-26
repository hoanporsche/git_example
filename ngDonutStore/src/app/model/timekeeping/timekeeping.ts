import { TimekeepingStatus } from './../timekeeping-status/timekeeping-status';
import { Staff } from "../staff/staff";

export class Timekeeping {
  constructor(
    public staff: Staff,
    public timekeepingCreatedDate: Date,
    public timekeepingIn: Date,
    public timekeepingOut: Date,
    public timekeepingStatus: TimekeepingStatus,
    public id?: number,
  ) {}
}