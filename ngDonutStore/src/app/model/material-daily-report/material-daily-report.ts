import { Material } from './../material/material';
import { Store } from "../store/store";

export class MaterialDailyreport {
  constructor(
    public id?: number,
    public storeId?: Store,
    public materialId?: Material,
    public materialRemain?: number,
    public materialImport?: number,
    public description?: string,
  ) {}
}