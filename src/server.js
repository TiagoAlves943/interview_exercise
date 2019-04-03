import express from 'express';
import {
    PORT
} from './configs/constans';
import routes from './routes';
import {
    db,
    initDB
} from './dbservice/init';
import {
    createUser,
    selectUser,
    updateUser,
} from './dbservice/user';
import validator from 'express-validator';
import bodyParser from 'body-parser';


const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
// if was need authenthication added up here before adding the routes
Object.keys(routes).forEach(key => server.use(`/${key}`, routes[key]));

(async () => {
    await initDB();
    server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
})();