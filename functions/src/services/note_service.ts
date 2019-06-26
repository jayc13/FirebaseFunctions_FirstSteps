import * as admin from "firebase-admin";
import App = admin.app.App;

class NoteService {

    private admin_firebase: App;
    private COLLECTION = 'notes';

    constructor(admin_firebase: App) {
        this.admin_firebase = admin_firebase;
    }

    getAllNotes() {
        return new Promise<any>((resolve: Function, reject: Function) => {
            const result: any[] = [];
            this.admin_firebase.firestore()
                .collection(this.COLLECTION)
                .get()
                .then(snapshot => {
                    snapshot.forEach(r => {
                        const data: any = r.data();
                        data['id'] = r.id;

                        result.push(data);
                    });
                    resolve(result);
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    createNote(data: any) {
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

    getNote(id: string) {
        return new Promise<any>((resolve: Function, reject: Function) => {
            this.admin_firebase.firestore()
                .collection(this.COLLECTION)
                .doc(id)
                .get()
                .then(snapshot => {
                    if (snapshot.data()) {
                        resolve({
                            id: id,
                            data: snapshot.data()
                        });
                    } else {
                        resolve(null);
                    }
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    updateNote(id: string, data: any) {
        return new Promise<any>((resolve: Function, reject: Function) => {
            this.admin_firebase.firestore()
                .collection(this.COLLECTION)
                .doc(id)
                .update(data)
                .then(() => {
                    resolve({
                        id: id,
                        data: data
                    });
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    deleteNote(id: string) {
        return new Promise<any>((resolve: Function, reject: Function) => {
            this.admin_firebase.firestore()
                .collection(this.COLLECTION)
                .doc(id)
                .delete()
                .then(() => {
                    resolve();
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }
}

export default NoteService;