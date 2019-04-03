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
    check('firstName').exists(),
    check('lastName').exists(),
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
            firstName,
            lastName,
            email
        } = req.body;
        console.log('teste', req.body);
        const newUser = await createUser(firstName, lastName, email);
        return res.status(200).json([{
            firstName,
            lastName,
            email,
            id: newUser
        }]);
    } catch (err) {
        return res.sendStatus(500);
    }
});

routes.put('/:id', [
    // username must be an email
    check('lastName').exists(),
    check('id').exists().isNumeric(),
    check('firstName').exists(),
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
            firstName,
            lastName,
            email
        } = req.body;
        await updateUser(firstName, lastName, email, req.params.id);
        return res.status(200).json([{
            firstName,
            lastName,
            email,
            id: req.params.id
        }]);
    } catch (err) {
        return res.sendStatus(500);
    }
});

routes.get('/', async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    try {
        const listUsers = await selectUser(req.query);
        return res.status(200).json(listUsers);
    } catch (err) {
        return res.sendStatus(500);
    }
});

export default routes;