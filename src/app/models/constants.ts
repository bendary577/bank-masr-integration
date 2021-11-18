import { environment } from 'src/environments/environment'

export class Constants {
  static SESSION = 'session'
  static LOCAL = 'local'
  static USERNAME = 'username'
  static PASSWORD = 'password'
  static KEEP_ME_SIGNED_IN = 'keep-me-signed-in'
  static USER_DATA = 'user_data'
  static USER_TOKEN = 'usertoken'
  static CURRENT_TAB = 'Welcome'

  static LOGINAUTH = environment.apiHost + '/oauth/token'
  static CHECKAUTH = environment.apiHost + '/auth/getAccessToken'
  static LOGIN = environment.apiHost + '/login'

  static GET_ACCOUNT = environment.apiHost + '/getAccount'
  static ADD_ACCOUNT = environment.apiHost + '/addAccount'
  static UPDATE_ACCOUNT = environment.apiHost + '/updateAccount'
  static UPDATE_ACCOUNT_SYNC_TYPES =
    environment.apiHost + '/updateAccountSyncTypes'

  static GET_USERS = environment.apiHost + '/getUsers'
  static ADD_USER = environment.apiHost + '/addAdminUser'
  static Delete_USERS_URL = environment.apiHost + '/deleteUsers'
  static SUSPEND_GEUST_URL = environment.apiHost + '/suspendApplicationUsers'

  static ADD_INVOKER_USER = environment.apiHost + '/addInvokerUser'
  static GET_INVOKER_USERS = environment.apiHost + '/getInvokerUser'

  static VENDOR_URL = environment.apiHost + '/getVendors'
  static ADD_VENDOR_URL = environment.apiHost + '/addVendor'

  static GET_SYNC_JOB_DATA_BY_ID = environment.apiHost + '/getSyncJobDataById'
  static GET_SYNC_JOB_DATA = environment.apiHost + '/getSyncJobData'
  static CLEAR_SYNC_JOB_DATA = environment.apiHost + '/clearSyncJobData'
  static GET_SYNC_JOB_DATA_BY_BOOKING_NO =
    environment.apiHost + '/getSyncJobDataByBookingNo'

  static GET_OPERATION_TYPES_URL = environment.apiHost + '/getOperationTypes'
  static GET_OPERATION_TYPE_BY_NAME_URL =
    environment.apiHost + '/getOperationTypeByName'
  static UPDATE_OPERATION_TYPE_URL =
    environment.apiHost + '/updateOperationTypeConfiguration'

  static GET_SYNC_JOB_TYPES_URL = environment.apiHost + '/getSyncJobTypes'
  static GET_SYNC_JOB_TYPES_BY_NAME_URL =
    environment.apiHost + '/getSyncJobTypesByName'
  static GET_ACC_SYNC_JOB_TYPES_BY_NAME_URL =
    environment.apiHost + '/getAccSyncJobTypesByName'

  static GET_APPLICATION_URL = environment.apiHost + '/getApplications'
  static SEND_EMAIL_SMS = environment.apiHost + '/sendSmsOrEmail'
  // static GET_SYNC_JOB_TYPES_BY_NAME_URL = environment.apiHost + '/getSyncJobTypesByName';
  // static GET_ACC_SYNC_JOB_TYPES_BY_NAME_URL = environment.apiHost + '/getAccSyncJobTypesByName';

  static UPDATE_SYNC_JOB_TYPES_URL =
    environment.apiHost + '/updateSyncJobTypesConfiguration'
  static UPDATE_COST_CENTER_MAPPING_URL =
    environment.apiHost + '/updateCostCenterLocationMapping'
  static GET_SYNC_JOBS_URL = environment.apiHost + '/getSyncJobs'
  static GET_OPERATION_JOBS_URL = environment.apiHost + '/getOperationJobs'

  static GET_OPERATION_URL = environment.apiHost + '/getOperation'
  static GET_OPERATION_DATA_BY_ID =
    environment.apiHost + '/getOperationDataById'

  static GET_SUPPLIERS_URL = environment.apiHost + '/getSuppliers'
  static GET_SUPPLIERS_DETAILS_URL =
    environment.apiHost + '/getSuppliersDetails'
  static GET_SUPPLIERS_TAXES_URL = environment.apiHost + '/getSupplierTaxes'
  static GET_SUPPLIERS_GROUPS_URL = environment.apiHost + '/getSupplierGroups'

  static GET_APPROVED_INVOICES_URL =
    environment.apiHost + '/getApprovedInvoices'
  static GET_COST_CENTER_URL = environment.apiHost + '/getCostCenter'

  static GET_CREDIT_NOTE_URL = environment.apiHost + '/getCreditNotes'

  static GET_WASTE_GROUPS_URL = environment.apiHost + '/getWasteGroups'
  static GET_WASTE_URL = environment.apiHost + '/getWastage'

  static GET_ZEALPAYMENT_URL = environment.apiHost + '/zeal/zealPayment'
  static GET_ZEALPOINTS_URL = environment.apiHost + '/zeal/zealPoints'
  static GET_ZEALVOUCHER_URL = environment.apiHost + '/zeal/zealVoucher'

  static GET_BUSINESS_UNITS_URL = environment.apiHost + '/getBusinessUnits'
  static GET_PAYMENT_METHODS_URL = environment.apiHost + '/getPaymentMethods'

  static GET_OVER_GROUPS_URL = environment.apiHost + '/getOverGroups'
  static MAP_ITEM_GROUPS_URL = environment.apiHost + '/mapItems'

  static GET_POS_SALES_URL = environment.apiHost + '/getPOSSales'
  static GET_POS_SALES_TENDERS_URL = environment.apiHost + '/getTenders'
  static ADD_POS_SALES_TENDER_URL = environment.apiHost + '/addTender'
  static ADD_POS_SALES_TAX_URL = environment.apiHost + '/addTax'
  static ADD_POS_SALES_MAJOR_GROUP_URL = environment.apiHost + '/addMajorGroup'
  static ADD_POS_SALES_DISCOUNT_URL = environment.apiHost + '/addDiscount'
  static ADD_POS_SALES_SERVICE_CHARGE_URL =
    environment.apiHost + '/addServiceCharge'
  static ADD_POS_SALES_REVENUE_CENTER_URL =
    environment.apiHost + '/addRevenueCenter'
  static ADD_POS_SALES_STATISTICS_URL =
    environment.apiHost + '/addSalesStatistics'

  static GET_CURRENT_DAYS_URL = environment.apiHost + '/getCurrentDays'

  static GET_BOOKED_PRODUCTION_URL =
    environment.apiHost + '/getBookedProduction'

  static GET_MENU_ITEMS_URL = environment.apiHost + '/SyncSimphonyMenuItems'
  static ADD_SIMPHONY_LOCATION_URL =
    environment.apiHost + '/addSimphonyLocation'

  // General Settings
  static GET_GENERAL_SETTINGS_URL = environment.apiHost + '/getGeneralSettings'
  static UPDATE_GENERAL_SETTINGS_URL =
    environment.apiHost + '/updateGeneralSettings'
  static FETCH_SUPPLIERS = environment.apiHost + '/getVendors'

  static LOGIN_PAGE = 'login'
  static WELCOME_PAGE = 'welcomePage'
  static HOME_PAGE = 'home'
  static SIDE_NAV = 'sidenav'

  static SUPPLIERS_PAGE = 'suppliers'
  static SUPPLIERS_CONFIG_PAGE = 'suppliersConfig'
  static SUPPLIERS_SUN_CONFIG_PAGE = 'suppliersSunConfig'
  static SUPPLIERS_DETAILS_PAGE = 'suppliersDetails'
  static SUPPLIERS_SYNC = 'Suppliers'

  static APPROVED_INVOICES_PAGE = 'approvedInvoices'
  static APPROVED_INVOICES_INFOR_PAGE = 'approvedInvoicesSun'
  static APPROVED_INVOICES_CONFIG_PAGE = 'approvedInvoicesConfig'
  static APPROVED_INVOICES_SUN_CONFIG_PAGE = 'approvedInvoicesSunConfig'
  static APPROVED_INVOICES_SYNC = 'Approved Invoices'

  static CREDIT_NOTE_PAGE = 'creditNotes'
  static CREDIT_NOTE_INFOR_PAGE = 'creditNotesSun'
  static CREDIT_NOTE_CONFIG_PAGE = 'creditNotesConfig'
  static CREDIT_NOTE_INFOR_CONFIG_PAGE = 'creditNotesSunConfig'
  static CREDIT_NOTE_SYNC = 'Credit Notes'

  //////////////////////////////////////////////// Transfers  ////////////////////////////////////////////////////////

  static BOOKED_TRANSFER_PAGE = 'bookedTransfers'
  static BOOKED_TRANSFER_INFOR_PAGE = 'bookedTransfersSun'
  static BOOKED_TRANSFER_CONFIG_PAGE = 'bookedTransfersConfig'
  static BOOKED_TRANSFER_INFOR_CONFIG_PAGE = 'bookedTransfersSunConfig'
  static BOOKED_TRANSFER_DETAILS_PAGE = 'bookedTransfersDetails'
  static BOOKED_TRANSFER_SYNC = 'Booked Transfers'

  static GET_BOOKED_TRANSFER_URL = environment.apiHost + '/getBookedTransfer'
  static GET_BOOKED_TRANSFER_DETAILS_URL =
    environment.apiHost + '/getBookedTransferDetails'

  //////////////////////////////////////////////// Consumption  ////////////////////////////////////////////////////////

  static CONSUMPTION_SYNC = 'Consumption'
  static CONSUMPTION_PAGE = 'consumption'
  static CONSUMPTION_CONFIG_PAGE = 'consumptionConfig'
  static CONSUMPTION_INFOR_PAGE = 'consumptionSun'
  static CONSUMPTION_SUN_CONFIG_PAGE = 'consumptionSunConfig'

  static GET_JOURNALS_URL = environment.apiHost + '/getConsumption'
  static ADD_JOURNAL_GROUP_URL =
    environment.apiHost + '/addConsumptionMajorGroup'
  static UPDATE_CONSUMPTION_LOCATIONS_URL =
    environment.apiHost + '/updateConsumptionLocations'

  //////////////////////////////////////////////// Cost of Goods  //////////////////////////////////////////////////////

  static COST_OF_GOODS_SYNC = 'Cost of Goods'
  static COST_OF_GOODS_PAGE = 'costOfGoods'
  static COST_OF_GOODS_CONFIG_PAGE = 'costOfGoodsConfig'

  static GET_COST_OF_GOODS_URL = environment.apiHost + '/getCostOfGoods'

  static POS_SALES_PAGE = 'posSales'
  static POS_SALES_INFOR_PAGE = 'posSalesSun'
  static POS_SALES_SYNC = 'POS Sales'
  static POS_SALES_CONFIG_PAGE = 'posSalesConfig'
  static POS_SALES_INFOR_CONFIG_PAGE = 'posSalesSunConfig'

  static WASTARGE_PAGE = 'wastage'
  static WASTARGE_INFOR_PAGE = 'wastageSun'
  static WASTARGE_SYNC = 'Wastage'
  static WASTARGE_CONFIG_PAGE = 'wastageConfig'
  static WASTARGE_INFOR_CONFIG_PAGE = 'wastageSunConfig'

  static BOOKED_PRODUCTION_INFOR_PAGE = 'bookedProductionSun'
  static BOOKED_PRODUCTION_CONFIG_PAGE = 'bookedProductionConfig'
  static BOOKED_PRODUCTION_INFOR_CONFIG_PAGE = 'bookedProductionSunConfig'
  static BOOKED_PRODUCTION_SYNC = 'Booked Production'

  static MENU_ITEMS_PAGE = 'menuItems'
  static MENU_ITEMS_CONFIG_PAGE = 'menuItemsConfig'
  static MENU_ITEMS_SYNC = 'Menu Items'

  static CREATE_ORDER_PAGE = 'createCheck'
  static CREATE_ORDER_CONFIG_PAGE = 'createCheckConfig'
  static CREATE_ORDER_OPERATION = 'Create Check'

  //////////////////////////////////////////////// Opera Payment  ////////////////////////////////////////////////////////

  static OPERA_PAYMENT_PAGE = 'operaPayments'
  static OPERA_PAYMENT_CONFIG_PAGE = 'operaPaymentConfig'
  static OPERA_PAYMENT_OPERATION = 'Opera Payment'
  static LIST_OPERA_TRANSACTIONS_URL =
    environment.apiHost + '/listOperaTransaction'
  static COUNT_OPERA_TRANSACTIONS_URL =
    environment.apiHost + '/countOperaTransaction'
  static FILTER_TRANSACTION = environment.apiHost + '/filterTransaction';

  //////////////////////////////////////////////// Simphony Payment  ////////////////////////////////////////////////////////

  static SIMPHONY_PAYMENT_PAGE = 'simphonyPayment'
  static SIMPHONY_PAYMENT_CONFIG_PAGE = 'simphonyPaymentConfig'
  static SIMPHONY_PAYMENT_OPERATION = 'Simphony Payment'
  static LIST_SIMPHONY_TRANSACTIONS_URL =
    environment.apiHost + '/listSimphonyTransaction'
  static COUNT_SIMPHONY_TRANSACTIONS_URL =
    environment.apiHost + '/countSimphonyTransaction'
  static FILTER_SIMPHONY_TRANSACTION = environment.apiHost + '/filterSimphonyTransaction';

  //////////////////////////////////////////////// Opera Reports  ////////////////////////////////////////////////////////

  //==> Reservation Report
  static RESERVATION_PAGE = '2wLsIntegration'
  static RESERVATION_CONFIG_PAGE = '2wLsIntegration'
  static RESERVATION_SYNC = '2wLsIntegration'

  static SYNC_OPERA_RESERVATION_URL =
    environment.apiHost + '/2wlsIntegration/syncExcel'
  static Get_Transaction_URL =
    environment.apiHost + '/2wlsIntegration/getTransaction'

  //==> New Booking Report
  static NEW_BOOKING_REPORT_PAGE = 'newBookingReport'
  static NEW_BOOKING_REPORT_CONFIG_PAGE = 'newBookingReportConfig'
  static NEW_BOOKING_REPORT_SYNC = 'New/Update Booking'

  static SYNC_OPERA_NEW_BOOKING_URL = environment.apiHost + '/fetchNewBooking'

  //==> Cancel Booking Report
  static CANCEL_BOOKING_REPORT_PAGE = 'cancelBookingReport'
  static CANCEL_BOOKING_REPORT_CONFIG_PAGE = 'cancelBookingReportConfig'
  static CANCEL_BOOKING_REPORT_SYNC = 'Cancel Booking Report'

  static SYNC_OPERA_CANCEL_BOOKING_URL =
    environment.apiHost + '/fetchCancelBooking'

  //==> Occupancy Update Report
  static OCCUPANCY_UPDATE_REPORT_PAGE = 'occupancyUpdateReport'
  static OCCUPANCY_UPDATE_REPORT_CONFIG_PAGE = 'occupancyUpdateReportConfig'
  static OCCUPANCY_UPDATE_REPORT_SYNC = 'Occupancy Update Report'

  static SYNC_OPERA_OCCUPANCY_UPDATE_URL =
    environment.apiHost + '/fetchOccupancyUpdate'

  //==> Expenses Details Report
  static EXPENSES_DETAILS_REPORT_PAGE = 'expensesDetailsReport'
  static EXPENSES_DETAILS_REPORT_CONFIG_PAGE = 'expensesDetailsReportConfig'
  static EXPENSES_DETAILS_REPORT_SYNC = 'Expenses Details Report'

  static SYNC_OPERA_EXPENSES_DETAILS_URL =
    environment.apiHost + '/fetchExpensesDetails'

  //==> Booking Dashboard
  static OPERA_BOOKING_DASHBOARD_PAGE = 'operaBookingDashboard'

  //////////////////////////////////////////////// Zeal Payment  /////////////////////////////////////////////////////////

  static ZEAL_PAYMENT_PAGE = 'zealPayment'
  static ZEAL_PAYMENT_CONFIG_PAGE = 'zealPaymentCongfig'
  static ZEAL_PAYMENT_OPERATION = 'Zeal Payment'

  static ZEAL_VOUCHER_PAGE = 'zealVoucher'
  static ZEAL_VOUCHER_CONFIG_PAGE = 'zealVoucherCongfig'
  static ZEAL_VOUCHER_OPERATION = 'Zeal Voucher'

  static ZEAL_POINTS_PAGE = 'zealPoints'
  static ZEAL_POINTS_CONFIG_PAGE = 'zealPointsCongfig'
  static ZEAL_POINTS_OPERATION = 'Zeal Points'

  static TABS_PAGE = 'tabs'
  static SETTING = 'setting'
  static ACCOUNT_CONFIGURATION = 'configuration'
  static COST_CENTER_ACCOUNT_MAPPING = 'costCenterAccountMapping'
  static COST_CENTER_LOCATION_MAPPING = 'costCenterLocationMapping'
  static SUPPLIERS_MAPPING = 'suppliersMapping'
  static INCLUDED_OVER_GROUPS = 'includedOverGroups'
  static USERS_CONFIGURATION = 'users'
  static SYNC_JOBS = 'syncjobs'
  static OPERATION_TYPES = 'operationTypesConfiguration'
  static SYNC_TYPE_SCHEDULER = 'Suppliers'
  static EXPORTED_FILES_PAGE = 'exportedFiles'
  static OPERA_REPORT_MAP_TABLES = 'operaReportMapTables'

  //////////////////////////////////////////////// Manage Application  //////////////////////////////////////////////

  static GET_LOYALTY_PAGE = 'loyalty'
  static MANAGE_COMPANIES = 'manageCompanies'
  static MANAGE_GROUPS = 'manageGroups'
  static MANAGE_SUB_GROUPS = 'manageSubGroups'
  static MANAGE_USERS = 'manageUsers'
  static MANAGE_ACTIVITIES = 'managActivities'
  static REDEEM_VOUCHER = 'Redeem Voucher'
  static SIMPHONY_DISCOUNT_MAP_TABLE = 'simphonyDiscountMaping'
  static POS_MACHINE_MAP_TABLE = 'posMachinMapping';
  static REWORD_PORINTS_SETTINGS= 'rewardPointsSettings';

  static GET_APP_GROUPS_URL = environment.apiHost + '/getApplicationGroups'
  static GET_ALL_APP_GROUPS_URL =
    environment.apiHost + '/getAllApplicationGroups'
  static ADD_APP_GROUP_URL = environment.apiHost + '/addApplicationGroup'
  static Delete_APP_GROUPS_URL =
    environment.apiHost + '/deleteApplicationGroups'
  static UPDATE_APP_GROUP_URL = environment.apiHost + '/updateApplicationGroup'
  static GET_APP_USERS_URL = environment.apiHost + '/getApplicationUsers'
  static GET_APP_USER = environment.apiHost + '/applicationUsers'
  static ADD_APP_USER_URL = environment.apiHost + '/addApplicationUser'
  static RESEND_QR_CODE = environment.apiHost + '/resendQRCode'
  static Delete_APP_USERS_URL = environment.apiHost + '/deleteApplicationUsers'
  static GET_TRANSACTION_URL =  environment.apiHost + '/transaction/getTransactions'
  static GET_TOP_USERS_URL = environment.apiHost + '/getTopUser'
  static GET_TOP_Groups_URL = environment.apiHost + '/getTopGroups'
  static GET_TOTAL_SPEND_URL = environment.apiHost + '/transaction/getTotalSpendTransactions'
  static GET_TOTAL_TRANS_INRANG_URL = environment.apiHost + '/transaction/getTransactionsInRange'
  static CHARGE_WALLET = environment.apiHost  + '/wallet/chargeWallet';
  static DEDUCT_WALLET = environment.apiHost  + '/wallet/deductFromWallet';
  static GET_TRANSACTION_PAGINATED = environment.apiHost + "/transaction/transactionPagination"

  //////////////////////////////////////////////// Manage Application  //////////////////////////////////////////////

  static GET_HOTEL_OPI_PAGE = 'hotelOpi'

  // static GET_APP_GROUPS_URL = environment.apiHost + '/getApplicationGroups';

  //////////////////////////////////////////////// Export To Excel //////////////////////////////////////////////

  static EXPORT_APPROVED_INVOICES =
    environment.apiHost + '/invoices/export/excel'
  static EXPORT_CREDIT_NOTES = environment.apiHost + '/invoices/export/excel'
  static EXPORT_BOOKED_TRANSFERS =
    environment.apiHost + '/transfers/export/excel'
  static EXPORT_BOOKED_PRODUCTION =
    environment.apiHost + '/bookedProduction/export/excel'
  static EXPORT_CONSUMPTION = environment.apiHost + '/consumption/export/excel'
  static EXPORT_WATAGE = environment.apiHost + '/wastage/export/excel'
  static EXPORT_SALES = environment.apiHost + '/sales/export/excel'
  static EXPORT_TRANSACTION_EXCEL_SHEET =
    environment.apiHost + '/transaction/exportExcelSheet'

  //////////////////////////////////////////////// Generate Custom Reports //////////////////////////////////////////////

  static GENERATE_WATAGE_CUSTOM_REPORT = environment.apiHost + '/generateWastageMonthlyReport'

  //////////////////////////////////////////////// Export To CSV //////////////////////////////////////////////

  static EXPORT_Excel = environment.apiHost + '/export/excel'
  static EXPORT_CSV = environment.apiHost + '/export/csv'
  static GENERATE_SINGLE_FILE_SALES =
    environment.apiHost + '/generateSingleFile'
  static LIST_SYNC_FILE_SALES = environment.apiHost + '/listSyncFiles'

  //////////////////////////////////////////////// ERD //////////////////////////////////////////////

  static EXPORT_TO_SUN_ERD = 'ExportSun'
  static SUN_ERD = 'Sun'
  static FUSION_ERD = 'Fusion'
  static SIMPHONY_ERD = 'Simphony'

    static GET_FEATURES = environment.apiHost + '/feature/getFeatures';
    static GET_ROLES = environment.apiHost + '/role/getRoles';
  
    static GET_WALLET_PAGE = 'entrySystem';
    static GET_VOUCHER_PAGE = 'voucher';
    static USER_PROFILE = 'userProfile';

    static GET_GENERIC_GROUP = environment.apiHost + '/getGenericGroup';
    static GET_EXPORTED_FILE = environment.apiHost + "/support/supportExportedFiles";

    /////////////////////////////////////////////// new Design /////////////////////////////////////////

    static SUPPORT = 'support';


    /////////////////////////////////////////////// 
}
