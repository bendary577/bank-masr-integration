import { environment } from 'src/environments/environment';

export class Constants {
    static SESSION = 'session';
    static LOCAL = 'local';
    static USERNAME = 'username';
    static PASSWORD = 'password';
    static KEEP_ME_SIGNED_IN = 'keep-me-signed-in';
    static USER_DATA = 'user_data';
    static USER_TOKEN = 'usertoken';
    static LOGIN_URL = environment.apiHost + '/FormLogin.aspx';
    static VENDOR_URL = environment.apiHost + '/MasterData/Vendors/OverviewVendor.aspx';
    static LOGIN_PAGE = 'login';
    static HOME_PAGE = 'home';

}
