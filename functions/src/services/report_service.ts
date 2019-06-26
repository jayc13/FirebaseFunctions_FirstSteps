import * as admin from "firebase-admin";
import App = admin.app.App;

class ReportService {

    private admin_firebase: App;
    private COLLECTION = 'reports';

    constructor(admin_firebase: App) {
        this.admin_firebase = admin_firebase;
    }

    createReport(data: any) {
        return new Promise<any>((resolve: Function, reject: Function) => {
            this.admin_firebase.firestore()
                .collection(this.COLLECTION)
                .add(data)
                .then(snapshot => {
                    resolve({
                        id: snapshot.id,
                        data: data
                    });
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }
}

export default ReportService;