import { environment } from 'src/environments/environment'

export class AggregatorsEndPoints {

    // Pages
    static TALABAT_ORDERS  = "talabatOrders"
    static AGGREGATOR_INTEGRATOR  = "aggregatorIntegrator"
    static AGGREGATOR_FOODICS_PRODUCTS  = "foodicsProduct"

    // End Points
    // Orders
    static GET_STORED_ORDERS =  environment.apiHost + "/aggregator/storedOrders";
    static COUNT_ORDERS =  environment.apiHost + "/aggregator/getOrdersCount";

    // Talabat
    static GET_TALABAT_ORDERS =  environment.apiHost + "/talabat";
    static GET_TALABAT_ORDER_DETAILS =  environment.apiHost + "/talabat/order";
    static GET_TALABAT_BRANCH_ORDERS =  environment.apiHost + "/talabat/branch";
    static SEND_TALABAT_ORDERS =  environment.apiHost + "/aggregator/orders";
    static GET_TALABAT_MENU_ITEMS =  environment.apiHost + "/talabat/menuItems";
  
    /////////////////////////////////////////////// Aggregator Statics /////////////////////////////////
  
    static GET_AGGREGATOR_PRODUCTS =  environment.apiHost + "/aggregator/products";
}
