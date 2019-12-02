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
    static LOGIN_PAGE = 'login';
    static HOME_PAGE = 'home';

}
