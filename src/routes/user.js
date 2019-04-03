import express from 'express';
import {
    check,
    validationResult
} from 'express-validator/check';
import {
    createUserHandler,
    selectUserHandler,
    updateUserHandler,
} from '../handlers/user';
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
        const newUser = await createUserHandler(givenName, familyName, email);
        return res.status(200).json(newUser);
    } catch (err) {
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

        const {
            givenName,
            familyName,
            email
        } = req.body;
        const updateUser = await updateUserHandler(givenName, familyName, email, req.params.id);
        return res.status(200).json(updateUser);
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
        const listUsers = await selectUserHandler({
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
        const listUsers = await selectUserHandler(req.query);
        return res.status(200).json(listUsers);
    } catch (err) {
        console.error('err', err);
        return res.sendStatus(500);
    }
});

export default routes;