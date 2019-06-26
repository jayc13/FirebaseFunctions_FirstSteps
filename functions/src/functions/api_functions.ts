import PingController from "../controllers/ping_controller";
import NoteController from "../controllers/note_controller";
import * as admin from "firebase-admin";
import App = admin.app.App;

const express = require('express');
const cors = require('cors');


class ApiFunction {

    private admin_firebase: App;

    constructor (admin_firebase: App) {
        this.admin_firebase = admin_firebase;
    }

    public getRouter() {
        const app = express();

        // Automatically allow cross-origin requests
        app.use(cors({ origin: true }));

        app.use(new PingController().getRouter());
        app.use(new NoteController(this.admin_firebase).getRouter());

        return app;
    }

}

export default ApiFunction;