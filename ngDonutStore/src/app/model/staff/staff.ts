import { WorkingCalender } from './../working-calender/working-calender';
import { Store } from "../store/store";

export class Staff {
  constructor(
    public staffName: string,
    public staffPicture: string,
    public staffStore: Store,
    public staffPhoneNumber: string,
    public staffAddress: string,
    public staffIdentityCard: string,
    public staffHomeTown: string,
    public staffSalary: number,
    public workingCalender: WorkingCalender,
    public staffEnbled: boolean,
    public staffId?: number,
    public staffCreatedTime?: Date,
    public staffUpdatedTime?: Date,
  ) {}
}