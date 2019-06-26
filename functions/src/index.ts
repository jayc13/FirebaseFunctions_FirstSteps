import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import ApiFunction from './functions/api_functions';
import App = admin.app.App;
import StorageFunction from "./functions/storage_functions";
import FirestoreFunction from "./functions/firestore_functions";

const admin_firebase: App = admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

exports.Api = functions.https.onRequest((req: any, res: any) => {
    new ApiFunction(admin_firebase).getRouter()(req, res);
});

exports.JsonUploaded = functions.storage.object().onFinalize(async (object: any) => {
    new StorageFunction(admin_firebase, object).processFile();
});

exports.newReportCreated = functions.firestore
    .document('reports/{reportId}')
    .onCreate((snapshot: any, context: any) => {
         new FirestoreFunction(admin_firebase)
            .processNewReportCreate({
                "title": "New report created",
                "report_id": context.params.reportId
            })
    });
