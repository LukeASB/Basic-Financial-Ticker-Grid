import { IGridData } from "./IGridData.js";

export class GridData implements IGridData {
    [key: string]: string | number;

    public name: string;
    public companyName: string;
    public price: number;
    public change: number;
    public chgPercent: string;
    public mktCap: string;

    constructor(data: IGridData) {
        this.name = data.name;
        this.companyName = data.companyName;
        this.price = data.price;
        this.change = data.change;
        this.chgPercent = data.chgPercent;
        this.mktCap = data.mktCap;
    }
}