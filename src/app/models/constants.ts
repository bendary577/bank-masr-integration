import { environment } from 'src/environments/environment';

export class Constants {
    static SESSION = 'session';
    static LOCAL = 'local';
    static USERNAME = 'username';
    static PASSWORD = 'password';
    static KEEP_ME_SIGNED_IN = 'keep-me-signed-in';
    static USER_DATA = 'user_data';
    static USER_TOKEN = 'usertoken';
    static VENDOR_URL = environment.apiHost + '/getVendors';
    static ADD_VENDOR_URL = environment.apiHost + '/addVendor';
    static GET_SUPPLIERS_URL = environment.apiHost + '/getSuppliers';
    static LOGIN = environment.apiHost + '/login';

    static GET_SYNC_JOB_TYPES_URL = environment.apiHost + '/getSyncJobTypes';
    static UPDATE_SYNC_JOB_TYPES_URL = environment.apiHost + '/updateSyncJobTypesConfiguration';
    static GET_SYNC_JOBS_URL = environment.apiHost + '/getSyncJobs';


    static GET_SUPPLIERS_DB_URL = environment.apiHost + '/getSuppliersDB';
    static GET_APPROVED_INVOICES_URL = environment.apiHost + '/getApprovedInvoices';
    static GET_APPROVED_INVOICES_DB_URL = environment.apiHost + '/getApprovedInvoicesDB';
    static GET_COST_CENTER_URL = environment.apiHost + '/getCostCenter';

    static GET_BOOKED_TRANSFER_URL = environment.apiHost + '/getBookedTransfer';
    static GET_BOOKED_TRANSFER_DB_URL = environment.apiHost + '/getBookedTransferDB';
    static GET_BOOKED_WASTE_URL = environment.apiHost + '/getBookedWaste';
    static GET_BOOKED_WASTE_DB_URL = environment.apiHost + '/getBookedWasteDB';

    static LOGIN_PAGE = 'login';
    static HOME_PAGE = 'home';
    static SIDE_NAV = 'sidenav';
    static SUPPLIERS_PAGE = 'suppliers';
    static APPROVED_INVOICES_PAGE = 'approvedInvoices';
    static TABS_PAGE = 'tabs';
    static END_POINT = '/getSuppliers';
    static SETTING = 'setting';
    static ACCOUNT_CONFIGURATION = 'configuration';
    static USERS_CONFIGURATION = 'users';
    static SYNC_JOBS = 'syncjobs';


}
