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

    static ADD_INVOKER_USER = environment.apiHost + '/addInvokerUser';
    static GET_INVOKER_USERS = environment.apiHost + '/getInvokerUser';

    static VENDOR_URL = environment.apiHost + '/getVendors';
    static ADD_VENDOR_URL = environment.apiHost + '/addVendor';

    static GET_SYNC_JOB_DATA_BY_ID = environment.apiHost + '/getSyncJobDataById';
    static GET_SYNC_JOB_DATA = environment.apiHost + '/getSyncJobData';
    static CLEAR_SYNC_JOB_DATA = environment.apiHost + '/clearSyncJobData';

    static GET_OPERATION_TYPES_URL = environment.apiHost + '/getOperationTypes';
    static GET_OPERATION_TYPE_BY_NAME_URL = environment.apiHost + '/getOperationTypeByName';
    static UPDATE_OPERATION_TYPE_URL = environment.apiHost + '/updateOperationTypeConfiguration';

    static GET_SYNC_JOB_TYPES_URL = environment.apiHost + '/getSyncJobTypes';
    static GET_SYNC_JOB_TYPES_BY_NAME_URL = environment.apiHost + '/getSyncJobTypesByName';
    static GET_ACC_SYNC_JOB_TYPES_BY_NAME_URL = environment.apiHost + '/getAccSyncJobTypesByName';

    static UPDATE_SYNC_JOB_TYPES_URL = environment.apiHost + '/updateSyncJobTypesConfiguration';
    static UPDATE_COST_CENTER_MAPPING_URL = environment.apiHost + '/updateCostCenterLocationMapping';
    static GET_SYNC_JOBS_URL = environment.apiHost + '/getSyncJobs';
    static GET_OPERATION_JOBS_URL = environment.apiHost + '/getOperationJobs';

    static GET_OPERATION_URL = environment.apiHost + '/getOperation';
    static GET_OPERATION_DATA_BY_ID = environment.apiHost + '/getOperationDataById';


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

    static GET_ZEALPAYMENT_URL = environment.apiHost + '/zeal/zealPayment';
    static GET_ZEALPOINTS_URL = environment.apiHost + '/zeal/zealPoints';
    static GET_ZEALVOUCHER_URL = environment.apiHost + '/zeal/zealVoucher';

    static GET_BUSINESS_UNITS_URL = environment.apiHost + '/getBusinessUnits';
    static GET_PAYMENT_METHODS_URL = environment.apiHost + '/getPaymentMethods';

    static GET_OVER_GROUPS_URL = environment.apiHost + '/getOverGroups';
    static MAP_ITEM_GROUPS_URL = environment.apiHost + '/mapItems';
    static GET_JOURNALS_URL = environment.apiHost + '/getConsumption';

    static GET_POS_SALES_URL = environment.apiHost + '/getPOSSales';
    static GET_POS_SALES_TENDERS_URL = environment.apiHost + '/getTenders';
    static ADD_POS_SALES_TENDER_URL = environment.apiHost + '/addTender';
    static ADD_POS_SALES_TAX_URL = environment.apiHost + '/addTax';
    static ADD_POS_SALES_MAJOR_GROUP_URL = environment.apiHost + '/addMajorGroup';
    static ADD_POS_SALES_DISCOUNT_URL = environment.apiHost + '/addDiscount';
    static ADD_POS_SALES_SERVICE_CHARGE_URL = environment.apiHost + '/addServiceCharge';
    static ADD_POS_SALES_REVENUE_CENTER_URL = environment.apiHost + '/addRevenueCenter';
    static ADD_POS_SALES_STATISTICS_URL = environment.apiHost + '/addSalesStatistics';

    static GET_CURRENT_DAYS_URL = environment.apiHost + '/getCurrentDays';

    static GET_BOOKED_PRODUCTION_URL = environment.apiHost + '/getBookedProduction';

    static GET_MENU_ITEMS_URL = environment.apiHost + '/SyncSimphonyMenuItems';
    static ADD_SIMPHONY_LOCATION_URL = environment.apiHost + '/addSimphonyLocation';

    // General Settings
    static GET_GENERAL_SETTINGS_URL = environment.apiHost + '/getGeneralSettings';
    static UPDATE_GENERAL_SETTINGS_URL = environment.apiHost + '/updateGeneralSettings';
    static FETCH_SUPPLIERS = environment.apiHost + '/getVendors';


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

    static CREDIT_NOTE_PAGE = 'creditNotes';
    static CREDIT_NOTE_INFOR_PAGE = 'creditNotesSun';
    static CREDIT_NOTE_CONFIG_PAGE = 'creditNotesConfig';
    static CREDIT_NOTE_INFOR_CONFIG_PAGE = 'creditNotesSunConfig';
    static CREDIT_NOTE_SYNC = 'Credit Notes';

    static BOOKED_TRANSFER_PAGE = 'bookedTransfers';
    static BOOKED_TRANSFER_INFOR_PAGE = 'bookedTransfersSun';
    static BOOKED_TRANSFER_CONFIG_PAGE = 'bookedTransfersConfig';
    static BOOKED_TRANSFER_INFOR_CONFIG_PAGE = 'bookedTransfersSunConfig';
    static BOOKED_TRANSFER_DETAILS_PAGE = 'bookedTransfersDetails';
    static BOOKED_TRANSFER_SYNC = 'Booked Transfers';

    static CONSUMPTION_SYNC = 'Consumption';
    static CONSUMPTION_PAGE = 'consumption';
    static CONSUMPTION_CONFIG_PAGE = 'consumptionConfig';
    static CONSUMPTION_INFOR_PAGE = 'consumptionSun';
    static CONSUMPTION_SUN_CONFIG_PAGE = 'consumptionSunConfig';

    static POS_SALES_PAGE = 'posSales';
    static POS_SALES_INFOR_PAGE = 'posSalesSun';
    static POS_SALES_SYNC = 'POS Sales';
    static POS_SALES_CONFIG_PAGE = 'posSalesConfig';
    static POS_SALES_INFOR_CONFIG_PAGE = 'posSalesSunConfig';

    static WASTARGE_PAGE = 'wastage';
    static WASTARGE_INFOR_PAGE = 'wastageSun';
    static WASTARGE_SYNC = 'Wastage';
    static WASTARGE_CONFIG_PAGE = 'wastageConfig';
    static WASTARGE_INFOR_CONFIG_PAGE = 'wastageSunConfig';

    static BOOKED_PRODUCTION_INFOR_PAGE = 'bookedProductionSun';
    static BOOKED_PRODUCTION_CONFIG_PAGE = 'bookedProductionConfig';
    static BOOKED_PRODUCTION_INFOR_CONFIG_PAGE = 'bookedProductionSunConfig';
    static BOOKED_PRODUCTION_SYNC = 'Booked Production';

    static MENU_ITEMS_PAGE = 'menuItems';
    static MENU_ITEMS_CONFIG_PAGE = 'menuItemsConfig';
    static MENU_ITEMS_SYNC = 'Menu Items';

    static CREATE_ORDER_PAGE = 'createCheck';
    static CREATE_ORDER_CONFIG_PAGE = 'createCheckConfig';
    static CREATE_ORDER_OPERATION = 'Create Check';

    static OPERA_PAYMENT_PAGE = 'operaPayment';
    static OPERA_PAYMENT_CONFIG_PAGE = 'operaPaymentConfig';
    static OPERA_PAYMENT_OPERATION = 'Opera Payment';

    static ZEAL_PAYMENT_PAGE = 'zealPayment';
    static ZEAL_PAYMENT_CONFIG_PAGE = 'zealPaymentCongfig';
    static ZEAL_PAYMENT_OPERATION = 'Zeal Payment';

    static ZEAL_VOUCHER_PAGE = 'zealVoucher';
    static ZEAL_VOUCHER_CONFIG_PAGE = 'zealVoucherCongfig';
    static ZEAL_VOUCHER_OPERATION = 'Zeal Voucher';

    static ZEAL_POINTS_PAGE = 'zealPoints';
    static ZEAL_POINTS_CONFIG_PAGE = 'zealPointsCongfig';
    static ZEAL_POINTS_OPERATION = 'Zeal Points';

    static TABS_PAGE = 'tabs';
    static SETTING = 'setting';
    static ACCOUNT_CONFIGURATION = 'configuration';
    static COST_CENTER_ACCOUNT_MAPPING = 'costCenterAccountMapping';
    static COST_CENTER_LOCATION_MAPPING = 'costCenterLocationMapping';
    static SUPPLIERS_MAPPING = 'suppliersMapping';
    static INCLUDED_OVER_GROUPS = 'includedOverGroups';
    static USERS_CONFIGURATION = 'users';
    static SYNC_JOBS = 'syncjobs';
    static OPERATION_TYPES = 'operationTypesConfiguration';
    static SYNC_TYPE_SCHEDULER = "Suppliers";
    static EXPORTED_FILES_PAGE = 'exportedFiles';

    //////////////////////////////////////////////// Manage Application  //////////////////////////////////////////////

    static LOYALTY = 'loyalty';
    static MANAGE_COMPANIES = 'manageCompanies';
    static MANAGE_GROUPS = "manageGroups";
    static MANAGE_USERS = 'manageUsers';

    static GET_APP_COMPANIES_URL = environment.apiHost + '/getApplicationCompanies';
    static ADD_APP_COMPANY_URL = environment.apiHost + '/addApplicationCompany';
    static Delete_APP_COMPANIES_URL = environment.apiHost + '/deleteApplicationCompanies';

    static GET_APP_GROUPS_URL = environment.apiHost + '/getApplicationGroups';
    static ADD_APP_GROUP_URL = environment.apiHost + '/addApplicationGroup';
    static Delete_APP_GROUPS_URL = environment.apiHost + '/deleteApplicationGroups';

    static GET_APP_USERS_URL = environment.apiHost + '/getApplicationUsers';
    static ADD_APP_USER_URL = environment.apiHost + '/addApplicationUser';
    static Delete_APP_USERS_URL = environment.apiHost + '/deleteApplicationUsers';

    //////////////////////////////////////////////// Export To Excel //////////////////////////////////////////////

    static EXPORT_APPROVED_INVOICES = environment.apiHost + '/invoices/export/excel';
    static EXPORT_CREDIT_NOTES = environment.apiHost + '/invoices/export/excel';
    static EXPORT_BOOKED_TRANSFERS = environment.apiHost + '/transfers/export/excel';
    static EXPORT_BOOKED_PRODUCTION = environment.apiHost + '/bookedProduction/export/excel';
    static EXPORT_CONSUMPTION = environment.apiHost + '/consumption/export/excel';
    static EXPORT_WATAGE = environment.apiHost + '/wastage/export/excel';
    static EXPORT_SALES = environment.apiHost + '/sales/export/excel';

    //////////////////////////////////////////////// Export To CSV //////////////////////////////////////////////

    static EXPORT_Excel = environment.apiHost + '/export/excel';
    static EXPORT_CSV = environment.apiHost + '/export/csv';
    static GENERATE_SINGLE_FILE_SALES = environment.apiHost + '/generateSingleFile';
    static LIST_SYNC_FILE_SALES = environment.apiHost + '/listSyncFiles';

    //////////////////////////////////////////////// ERD //////////////////////////////////////////////

    static EXPORT_TO_SUN_ERD = 'ExportSun';
    static SUN_ERD = 'Sun';
    static FUSION_ERD = 'Fusion';
    static SIMPHONY_ERD = 'Simphony';
}
