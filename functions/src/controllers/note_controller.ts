import {Router} from "express";
import NoteService from "../services/note_service";
import * as admin from "firebase-admin";
import App = admin.app.App;

class NoteController {

    private BASE_PATH = '/notes';

    private note_service: NoteService;

    constructor(admin_firebase: App) {
        this.note_service = new NoteService(admin_firebase);
    }

    getRouter() {
        const router = Router();

        router.get(this.BASE_PATH + '/', async (req, res) => {
            await this.note_service.getAllNotes()
                .then((notes) => {
                    res.status(200).json({'notes': notes});
                })
                .catch((e: Error) => {
                    res.status(500).json(e);
                });
        });

        router.post(this.BASE_PATH + '/', async (req, res) => {
            await this.note_service.createNote(req.body)
                .then((note) => {
                    res.status(201).json({'note': note});
                })
                .catch((e: Error) => {
                    res.status(500).json(e);
                });
        });

        router.get(this.BASE_PATH + '/:id', async (req, res) => {
            await this.note_service.getNote(req.params.id)
                .then((note) => {
                    if (note !== null) {
                        res.status(200).json({'note': note});
                    } else {
                        res.status(404).json({});
                    }
                })
                .catch((e: Error) => {
                    res.json(e).status(500);
                });
        });

        router.put(this.BASE_PATH + '/:id', async (req, res) => {
            await this.note_service.updateNote(req.params.id, req.body)
                .then((note) => {
                    if (note !== null) {
                        res.status(200).json({'note': note});
                    } else {
                        res.status(404).json();
                    }
                })
                .catch((e: Error) => {
                    res.status(500).json(e);
                });
        });

        router.delete(this.BASE_PATH + '/:id', async (req, res) => {
            await this.note_service.deleteNote(req.params.id)
                .then(() => {
                    res.status(204).json({});
                })
                .catch((e: Error) => {
                    res.status(500).json(e);
                });
        });

        return router;
    }

}

export default NoteController;