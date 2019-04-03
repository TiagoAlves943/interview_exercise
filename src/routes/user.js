import express from 'express';
import {
    check,
    validationResult
} from 'express-validator/check';
import {
    createUser,
    selectUser,
    updateUser
} from '../dbservice/user';
const routes = express.Router();

routes.post('/', [
    // username must be an email
    check('givenName').exists(),
    check('familyName').exists(),
    check('email').exists().isEmail(),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    try {
        const {
            givenName,
            familyName,
            email
        } = req.body;
        const newUser = await createUser(givenName, familyName, email);
        const listUsers = await selectUser({
            id: newUser
        });
        return res.status(200).json(listUsers);
    } catch (err) {
        console.error('err', err);
        return res.sendStatus(500);
    }
});

routes.put('/:id', [
    // username must be an email
    check('familyName').exists(),
    check('id').exists().isNumeric(),
    check('givenName').exists(),
    check('email').exists().isEmail(),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    try {
        let listUsers = await selectUser({
            id: req.params.id
        });
        if (listUsers.length === 0) {
            return res.sendStatus(204);
        }
        const {
            givenName,
            familyName,
            email
        } = req.body;
        await updateUser(givenName, familyName, email, req.params.id);
        listUsers = await selectUser({
            id: req.params.id
        });
        return res.status(200).json(listUsers);
    } catch (err) {
        console.error('err', err);
        return res.sendStatus(500);
    }
});

routes.get('/:id', [
    check('id').exists().isNumeric()
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    try {
        const listUsers = await selectUser({
            id: req.params.id
        });
        return res.status(200).json(listUsers);
    } catch (err) {
        console.error('err', err);
        return res.sendStatus(500);
    }
});

routes.get('/', async (req, res) => {
    try {
        const listUsers = await selectUser(req.query);
        return res.status(200).json(listUsers);
    } catch (err) {
        console.error('err', err);
        return res.sendStatus(500);
    }
});

export default routes;