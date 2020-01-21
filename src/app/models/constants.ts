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

    static LOGINAUTH = environment.apiHost + '/auth/login';
    static CHECKAUTH = environment.apiHost +'/auth/getAccessToken';
    static LOGIN = environment.apiHost + '/login';

    static GET_USERS = environment.apiHost + '/auth/getUsers';

    static VENDOR_URL = environment.apiHost + '/getVendors';
    static ADD_VENDOR_URL = environment.apiHost + '/addVendor';

    static GET_SYNC_JOB_DATA_BY_ID = environment.apiHost + '/getSyncJobDataById';
    static GET_SYNC_JOB_DATA = environment.apiHost + '/getSyncJobData';


    static GET_SYNC_JOB_TYPES_URL = environment.apiHost + '/getSyncJobTypes';
    static GET_SYNC_JOB_TYPES_BY_NAME_URL = environment.apiHost + '/getSyncJobTypesByName';
    static UPDATE_SYNC_JOB_TYPES_URL = environment.apiHost + '/updateSyncJobTypesConfiguration';
    static GET_SYNC_JOBS_URL = environment.apiHost + '/getSyncJobs';

    static GET_SUPPLIERS_URL = environment.apiHost + '/getSuppliers';
    static GET_SUPPLIERS_DB_URL = environment.apiHost + '/getSuppliersDB';
    static GET_SUPPLIERS_DETAILS_URL = environment.apiHost + '/getSuppliersDetails';
    static GET_SUPPLIERS_TAXES_URL = environment.apiHost + '/getSupplierTaxes';
    static GET_SUPPLIERS_GROUPS_URL = environment.apiHost + '/getSupplierGroups';
    
    static GET_APPROVED_INVOICES_URL = environment.apiHost + '/getApprovedInvoices';
    static GET_APPROVED_INVOICES_DB_URL = environment.apiHost + '/getApprovedInvoicesDB';
    static GET_COST_CENTER_URL = environment.apiHost + '/getCostCenter';

    static GET_CREDIT_NOTE_URL = environment.apiHost + '/getCreditNotes';
    static GET_CREDIT_NOTE_DB_URL = environment.apiHost + '/getCreditNotesDB';

    static GET_BOOKED_TRANSFER_URL = environment.apiHost + '/getBookedTransfer';
    static GET_BOOKED_TRANSFER_DB_URL = environment.apiHost + '/getBookedTransferDB';
    static GET_BOOKED_TRANSFER_DETAILS_URL = environment.apiHost + '/getBookedTransferDetails';

    static GET_BOOKED_WASTE_URL = environment.apiHost + '/getBookedWaste';
    static GET_BOOKED_WASTE_DB_URL = environment.apiHost + '/getBookedWasteDB';

    static GET_BUSINESS_UNITS_URL = environment.apiHost + '/getBusinessUnits';

    static GET_OVER_GROUPS_URL = environment.apiHost + '/getOverGroups';
    static MAP_ITEM_GROUPS_URL = environment.apiHost + '/mapItems';
    static GET_JOURNALS_URL = environment.apiHost + '/getJournals';


    static LOGIN_PAGE = 'login';
    static HOME_PAGE = 'home';
    static SIDE_NAV = 'sidenav';

    static SUPPLIERS_PAGE = 'suppliers';
    static SUPPLIERS_CONFIG_PAGE = 'suppliersConfig';
    static SUPPLIERS_DETAILS_PAGE = 'suppliersDetails';
    static SUPPLIERS_SYNC = 'Suppliers';

    static APPROVED_INVOICES_PAGE = 'approvedInvoices';
    static APPROVED_INVOICES_CONFIG_PAGE = 'approvedInvoicesConfig';
    static APPROVED_INVOICES_SYNC = 'Approved Invoices';

    static BOOKED_TRANSFER_PAGE = 'bookedTransfers';
    static BOOKED_TRANSFER_CONFIG_PAGE = 'bookedTransfersConfig';
    static BOOKED_TRANSFER_DETAILS_PAGE = 'bookedTransfersDetails';
    static BOOKED_TRANSFER_SYNC = 'Booked Transfers';

    static BOOKED_WASTE_PAGE = 'bookedWastes';
    static BOOKED_WASTE_CONFIG_PAGE = 'bookedWastesConfig';

    static CREDIT_NOTE_PAGE = 'creditNotes';
    static CREDIT_NOTE_CONFIG_PAGE = 'creditNotesConfig';
    static CREDIT_NOTE_SYNC = 'Credit Notes';

    static CONSUMPTION_PAGE = 'Consumptions';

    static CONSUMPTIONS_SYNC = 'Consumptions';
    static TRANSFERS_SYNC = 'Transfers';
    static ADJUSTMENTS_SYNC = 'Adjustments';
    static JOURNALS_SYNC = 'Journals';

    static JOURNALS_PAGE = 'journals';
    static JOURNALS_CONFIG_PAGE = 'journalsConfig';

    static TABS_PAGE = 'tabs';
    static END_POINT = '/getSuppliers';
    static SETTING = 'setting';
    static ACCOUNT_CONFIGURATION = 'configuration';
    static USERS_CONFIGURATION = 'users';
    static SYNC_JOBS = 'syncjobs';


}
