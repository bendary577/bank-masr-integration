export class SimphonyDiscount {
    public discountId: number;
    public discountRate: number;
    public deleted: boolean;

    public constructor(discountId: number, discountRate: number) { 
        this.discountId = discountId;
        this.discountRate = discountRate
    }
}
