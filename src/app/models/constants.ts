import { environment } from 'src/environments/environment';

export class Constants {
    static SESSION = 'session';
    static LOCAL = 'local';
    static USERNAME = 'username';
    static PASSWORD = 'password';
    static KEEP_ME_SIGNED_IN = 'keep-me-signed-in';
    static USER_DATA = 'user_data';
    static USER_TOKEN = 'usertoken';
    static CURRENT_TAB = 'Welcome';

    static LOGINAUTH = environment.apiHost + '/oauth/token';
    static CHECKAUTH = environment.apiHost +'/auth/getAccessToken';
    static LOGIN = environment.apiHost + '/login';

    static GET_ACCOUNT = environment.apiHost + '/getAccount';
    static ADD_ACCOUNT = environment.apiHost + '/addAccount';
    static UPDATE_ACCOUNT = environment.apiHost + '/updateAccount';

    static GET_USERS = environment.apiHost + '/getUsers';
    static ADD_USER = environment.apiHost + '/addUser';

    static VENDOR_URL = environment.apiHost + '/getVendors';
    static ADD_VENDOR_URL = environment.apiHost + '/addVendor';

    static GET_SYNC_JOB_DATA_BY_ID = environment.apiHost + '/getSyncJobDataById';
    static GET_SYNC_JOB_DATA = environment.apiHost + '/getSyncJobData';


    static GET_SYNC_JOB_TYPES_URL = environment.apiHost + '/getSyncJobTypes';
    static GET_SYNC_JOB_TYPES_BY_NAME_URL = environment.apiHost + '/getSyncJobTypesByName';
    static GET_ACC_SYNC_JOB_TYPES_BY_NAME_URL = environment.apiHost + '/getAccSyncJobTypesByName';

    static UPDATE_SYNC_JOB_TYPES_URL = environment.apiHost + '/updateSyncJobTypesConfiguration';
    static UPDATE_COST_CENTER_LOCATION_MAPPING_URL = environment.apiHost + '/updateCostCenterLocationMapping';
    static GET_SYNC_JOBS_URL = environment.apiHost + '/getSyncJobs';

    static GET_SUPPLIERS_URL = environment.apiHost + '/getSuppliers';
    static GET_SUPPLIERS_DETAILS_URL = environment.apiHost + '/getSuppliersDetails';
    static GET_SUPPLIERS_TAXES_URL = environment.apiHost + '/getSupplierTaxes';
    static GET_SUPPLIERS_GROUPS_URL = environment.apiHost + '/getSupplierGroups';

    static GET_APPROVED_INVOICES_URL = environment.apiHost + '/getApprovedInvoices';
    static GET_COST_CENTER_URL = environment.apiHost + '/getCostCenter';

    static GET_CREDIT_NOTE_URL = environment.apiHost + '/getCreditNotes';

    static GET_BOOKED_TRANSFER_URL = environment.apiHost + '/getBookedTransfer';
    static GET_BOOKED_TRANSFER_DETAILS_URL = environment.apiHost + '/getBookedTransferDetails';

    static GET_WASTE_GROUPS_URL = environment.apiHost + '/getWasteGroups';
    static GET_WASTE_URL = environment.apiHost + '/getWastage';

    static GET_BUSINESS_UNITS_URL = environment.apiHost + '/getBusinessUnits';
    static GET_PAYMENT_METHODS_URL = environment.apiHost + '/getPaymentMethods';

    static GET_OVER_GROUPS_URL = environment.apiHost + '/getOverGroups';
    static MAP_ITEM_GROUPS_URL = environment.apiHost + '/mapItems';
    static GET_JOURNALS_URL = environment.apiHost + '/getConsumptions';

    static GET_POS_SALES_URL = environment.apiHost + '/getPOSSales';
    static GET_POS_SALES_TENDERS_URL = environment.apiHost + '/getTenders';

    static GET_CURRENT_DAYS_URL = environment.apiHost + '/getCurrentDays';


    static LOGIN_PAGE = 'login';
    static WELCOME_PAGE = 'welcomePage';
    static HOME_PAGE = 'home';
    static SIDE_NAV = 'sidenav';

    static SUPPLIERS_PAGE = 'suppliers';
    static SUPPLIERS_CONFIG_PAGE = 'suppliersConfig';
    static SUPPLIERS_SUN_CONFIG_PAGE = 'suppliersSunConfig';
    static SUPPLIERS_DETAILS_PAGE = 'suppliersDetails';
    static SUPPLIERS_SYNC = 'Suppliers';

    static APPROVED_INVOICES_PAGE = 'approvedInvoices';
    static APPROVED_INVOICES_INFOR_PAGE = 'approvedInvoicesSun';
    static APPROVED_INVOICES_CONFIG_PAGE = 'approvedInvoicesConfig';
    static APPROVED_INVOICES_SUN_CONFIG_PAGE = 'approvedInvoicesSunConfig';
    static APPROVED_INVOICES_SYNC = 'Approved Invoices';

    static BOOKED_TRANSFER_PAGE = 'bookedTransfers';
    static BOOKED_TRANSFER_INFOR_PAGE = 'bookedTransfersSun';
    static BOOKED_TRANSFER_CONFIG_PAGE = 'bookedTransfersConfig';
    static BOOKED_TRANSFER_INFOR_CONFIG_PAGE = 'bookedTransfersSunConfig';
    static BOOKED_TRANSFER_DETAILS_PAGE = 'bookedTransfersDetails';
    static BOOKED_TRANSFER_SYNC = 'Booked Transfers';

    static CREDIT_NOTE_PAGE = 'creditNotes';
    static CREDIT_NOTE_CONFIG_PAGE = 'creditNotesConfig';
    static CREDIT_NOTE_SYNC = 'Credit Notes';

    static CONSUMPTIONS_SYNC = 'Consumptions';
    static TRANSFERS_SYNC = 'Transfers';
    static ADJUSTMENTS_SYNC = 'Adjustments';

    static JOURNALS_SYNC = 'Consumptions';
    static JOURNALS_PAGE = 'consumptions';
    static JOURNALS_CONFIG_PAGE = 'consumptionsConfig';

    static JOURNALS_INFOR_PAGE = 'journalsSun';
    static JOURNALS_SUN_CONFIG_PAGE = 'journalsSunConfig';

    static POS_SALES_PAGE = 'posSales';
    static POS_SALES_SYNC = 'POS Sales';
    static POS_SALES_CONFIG_PAGE = 'posSalesConfig';

    static WASTARGE_PAGE = 'wastage';
    static WASTARGE_INFOR_PAGE = 'wastageSun';
    static WASTARGE_SYNC = 'Wastage';
    static WASTARGE_CONFIG_PAGE = 'wastageConfig';
    static WASTARGE_INFOR_CONFIG_PAGE = 'wastageSunConfig';

    static TABS_PAGE = 'tabs';
    static END_POINT = '/getSuppliers';
    static SETTING = 'setting';
    static ACCOUNT_CONFIGURATION = 'configuration';
    static COST_CENTER_LOCATION_MAPPING = 'costCenterLocationMapping';
    static USERS_CONFIGURATION = 'users';
    static SYNC_JOBS = 'syncjobs';


    static SYNC_TYPE_SCHEDULER = "Suppliers";
}
