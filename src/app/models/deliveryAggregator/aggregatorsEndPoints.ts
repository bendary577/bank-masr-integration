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
    static AUTHENTICATE_TALABAT =  environment.apiHost + "/talabat/authenticate";

     // Foodics
    static GET_FOODICS_BRANCHES = environment.apiHost + "/aggregator/getFoodicsBranches";
    static GET_FOODICS_PRODUCTS =  environment.apiHost + "/aggregator/foodicsProducts/";
    static GET_FOODICS_PRODUCTS_PAGINATED =  environment.apiHost + "/aggregator/foodicsProductsPaginated/";
    static GET_MAPPED_PRODUCTS =  environment.apiHost + "/aggregator/getMappedProducts/";
    static GET_UNMAPPED_PRODUCTS =  environment.apiHost + "/aggregator/getUnMappedProducts/";
    static AUTHORIZE_FOODICS_ACCOUNT = "https://console-sandbox.foodics.com/authorize";
    static REQUEST_FOODICS_ACCESS_TOKEN = environment.apiHost + "/aggregator/getFoodicsAccessToken";
    static SAVE_UPDATES_EMAIL = environment.apiHost + "/aggregator/saveUpdatesEmail";
  
    /////////////////////////////////////////////// Aggregator Statics /////////////////////////////////
  
    static GET_AGGREGATOR_PRODUCTS =  environment.apiHost + "/aggregator/products";
}
