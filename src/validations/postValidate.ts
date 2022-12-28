import { body } from 'express-validator';

export const create = [
    body("title", "Name must be at least 3 characters long and max 50").isLength({min: 3, max: 50}),
    body("content", "Must be a at least 10 characters long").isLength({min: 10}),
    body("published", "Must be a boolean value").isBoolean()
];

export const changeState = [
    body("published", "Must be boolean").isBoolean(),
    body("id", "Invalid id").isLength({min: 3})
];

export const update = [
    body("title", "Name must be at least 3 characters long and max 50").isLength({min: 3, max: 50}).optional(),
    body("content", "Must be a at least 10 characters long").isLength({min: 10}).optional(),
    body("published", "Must be a boolean value").isBoolean().optional(),
    body("id", "Invalid id").isLength({min: 3})
]