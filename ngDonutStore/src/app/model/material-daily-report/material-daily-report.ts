import { Material } from './../material/material';
import { Store } from "../store/store";

export class MaterialDailyreport {
  constructor(
    public storeId: Store,
    public materialId: Material,
    public materialRemain: number,
    public materialImport: number,
    public id?: number,
    public description?: string,
  ) {}
}