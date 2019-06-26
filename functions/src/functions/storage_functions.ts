import * as admin from "firebase-admin";
import App = admin.app.App;
import FileService from "../services/file_service";
import ReportService from "../services/report_service";

const path = require('path');
const os = require('os');
const fs = require('fs');

class StorageFunction {

    private admin_firebase: App;
    private readonly fileName: string;
    private readonly filePath: string;
    private tempFilePath: string;
    private bucket: any;

    constructor(admin_firebase: any, obj: any) {
        this.admin_firebase = admin_firebase;

        const fileBucket = obj.bucket;
        this.filePath = obj.name;
        this.bucket = admin.storage().bucket(fileBucket);
        this.fileName = path.basename(this.filePath);

        this.tempFilePath = '';

    }

     processFile() {
        const self = this;

        const tempFilePath: string = path.join(os.tmpdir(), this.fileName);

        this.tempFilePath = tempFilePath;

        this.bucket.file(this.filePath)
            .download({destination: tempFilePath})
            .then(() => {
                FileService.processFileAsJson(tempFilePath)
                    .then((obj: any) => {
                        new ReportService(self.admin_firebase)
                            .createReport(obj)
                            .then(() => {
                                self.finishFileProcessing();
                            })
                            .catch((e) => {
                                console.error(e);
                                self.finishFileProcessing();
                            });
                    })
                    .catch((e) => console.error(e));
                console.log('Archivo descargado localmente: ', tempFilePath);
            })
            .catch((e: Error) => {
                console.error(e);
            });
    }

    finishFileProcessing() {
        fs.unlinkSync(this.tempFilePath);
        return this;
    }

}

export default StorageFunction;