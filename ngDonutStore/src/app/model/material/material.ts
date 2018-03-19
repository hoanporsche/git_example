import { Supply } from './../supply/supply';

export class Material {
  constructor(
    public materialName: string,
    public materialPicture: string,
    public materialSupply: Supply,
    public materialSingleValue: number,
    public materialId?: number,
    public materialEnbled?: boolean,
    public materialDateCreated?: Date,
    public materialDateUpdated?: Date,
  ) {}
}