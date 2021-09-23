import { Injectable } from "@angular/core";
import { FileInfo, MIME_TYPE_FOLDER } from "src/app/models/fileInfo";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];
var SCOPES = "https://www.googleapis.com/auth/drive";
declare var UploaderForGoogleDrive;

@Injectable()
export class DriveService {
  googleAuth: gapi.auth2.GoogleAuth;

  constructor() {}

  initClient(apiKey, clientId) {
    console.log("A")
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

  // create(parentId: string, folderName: string) {
  //   var folder = {
  //     name: folderName,
  //     mimeType: MIME_TYPE_FOLDER,
  //     parents: [parentId],
  //   };
  //   return gapi.client.drive.files
  //     .create({
  //       //resource: folder,
  //       fields: "id, name, mimeType, modifiedTime, size",
  //     })
  //     .then((res) => {
  //       return FileInfo.fromGoogleFile(res.result);
  //     });
  // }

  delete(fileId: string) {
    return gapi.client.drive.files.delete({
      fileId: fileId,
    });
  }

  getFiles(folderId: string) {
    return gapi.client.drive.files
      .list({
        pageSize: 100,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size)",
        q: `'${folderId}' in parents and trashed = false`,
      })
      .then((res) => {
        let files: FileInfo[] = [];
        res.result.files.forEach((file) =>
          files.push(FileInfo.fromGoogleFile(file))
        );
        return files;
      });
  }

  importFile(
    parentId: string,
    file: FileInfo,
    onError: any,
    onComplete: any,
    onProgress: any
  ) {
    var contentType = file.Blob.type || "application/octet-stream";
    var metadata = {
      name: file.Blob.name,
      mimeType: contentType,
      parents: [parentId],
    };

    var uploader = new UploaderForGoogleDrive({
      file: file.Blob,
      token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
        .access_token,
      metadata: metadata,
      onError: onError,
      onComplete: onComplete,
      onProgress: onProgress,
      params: {
        convert: false,
        ocr: false,
      },
    });

    uploader.upload();
  }
}
