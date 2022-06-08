import { FoodicsAccountData } from "./foodicsAccountData";

export class AggregatorConfiguration {

    foodicsAccount: any;
    foodicsAccountData: any;
    branchMappings: any
    productsMappings: any
    unMappedProductsMappings: any
    productsMappingNeedsAttention: any
    modifierMappings: any[]
    discountMappings: any
    customerMappings: any[];
    addressMappings: any[];
    foodicsDropDownProducts: any[];
    foodicsDropDownModifiers: any[];
    foodicsDropDownBranches: any[];
    integrationStatus: any
    talabatIntegrationStatus: any
    foodicsIntegrationStatus: any
    mailRequiredForUpdates: any  

    public constructor() {  }
}