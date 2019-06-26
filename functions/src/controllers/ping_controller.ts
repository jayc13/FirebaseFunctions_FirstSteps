import {Router} from "express";

class PingController {

    private BASE_PATH = '/ping';
    
    getRouter() {
        const router = Router();

        router.get(this.BASE_PATH + '/', async (req, res) => {
            res.status(200).send({'ping': 'pong'});
        });
        
        return router;
    }
    
}

export default PingController;