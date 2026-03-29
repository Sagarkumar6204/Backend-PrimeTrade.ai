import { body, validationResult } from 'express-validator';

export const validateRegistration = [
    body('username').isLength({ min: 3 }).withMessage('Username kam se kam 3 characters ka ho'),
    body('email').isEmail().withMessage('Sahi email dalein'),
    body('password').isLength({ min: 6 }).withMessage('Password 6 characters ka ho'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];


export const validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           
            console.log("Validation Errors:", errors.array()); 
            return res.status(400).json({ 
                success: false, 
                message: errors.array()[0].msg 
            });
        }
        next();
    }
];