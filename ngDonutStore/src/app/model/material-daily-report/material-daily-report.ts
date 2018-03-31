import { Material } from './../material/material';
import { Store } from "../store/store";

export class MaterialDailyReport {
  constructor(
    public id?: number,
    public storeId?: Store,
    public dateCreated? : Date,
    public materialId?: Material,
    public materialRemain?: number,
    public materialImport?: number,
    public description?: string,
  ) {}
}