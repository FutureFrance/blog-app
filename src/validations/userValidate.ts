import { body } from 'express-validator';

export const registration = [
    body("name", "Name must be at least 3 characters long and max 50").isLength({min: 3, max: 50}),
    body("email", "Must be a valid email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({min: 6})
];

export const login = [
    body("email", "Must be a valid email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({min: 6})
];