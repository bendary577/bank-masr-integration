import { Injectable } from "@angular/core";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
var SCOPES = "https://www.googleapis.com/auth/drive";

@Injectable()
export class DriveService {
  googleAuth: gapi.auth2.GoogleAuth;

  constructor() {}

  initClient(apiKey, clientId) {
    return new Promise<void>((resolve, reject) => {
      gapi.load("client:auth2", () => {
        return gapi.client
          .init({
            apiKey: apiKey,
            clientId: clientId,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            this.googleAuth = gapi.auth2.getAuthInstance();
            resolve();
          });
      });
    });
  }

  get isSignedIn(): boolean {
    return this.googleAuth.isSignedIn.get();
  }

  signIn() {
    return this.googleAuth
      .signIn({
        prompt: "consent",
      })
      .then((googleUser: gapi.auth2.GoogleUser) => {
        console.log("googleUser", googleUser.getBasicProfile());
      });
  }

  signOut(): void {
    this.googleAuth.signOut();
  }
}
