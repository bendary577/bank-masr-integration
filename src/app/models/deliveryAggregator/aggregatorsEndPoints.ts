import { environment } from 'src/environments/environment'

export class AggregatorsEndPoints {

    // Pages
    static TALABAT_ORDERS  = "talabatOrders"
    static AGGREGATOR_INTEGRATOR  = "aggregatorIntegrator"

    // End Points
    // Talabat
    static GET_TALABAT_ORDERS =  environment.apiHost + "/talabat";
    static GET_TALABAT_ORDER_DETAILS =  environment.apiHost + "/talabat/order";
    static GET_TALABAT_BRANCH_ORDERS =  environment.apiHost + "/talabat/branch";
    static SEND_TALABAT_ORDERS =  environment.apiHost + "/aggregator/orders";
  
    /////////////////////////////////////////////// Aggregator Statics /////////////////////////////////
  
    static GET_AGGREGATOR_PRODUCTS =  environment.apiHost + "/aggregator/products";
}
