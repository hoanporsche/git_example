
export class Supply {
  constructor(
    public supplyName: string,
    public supplyPhone: string,
    public supplyAddress: string,
    public supplyEnabled: boolean,
    public supplyId?: number,
    public supplyDateCreated?: Date,
    public supplyDateUpdated?: Date,
  ) {}
}