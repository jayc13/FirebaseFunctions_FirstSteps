import * as admin from "firebase-admin";
import App = admin.app.App;
import NoteService from "../services/note_service";

class FirestoreFunction {

    private admin_firebase: App;

    constructor(admin_firebase: any) {
        this.admin_firebase = admin_firebase;
    }

     processNewReportCreate(data: any) {
        new NoteService(this.admin_firebase)
            .createNote(data)
            .catch(e => console.error(e));
    }

}

export default FirestoreFunction;