// Validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = {
        name: Joi.string()
            .min(6)
            .max(30)
            .required(),
        email: Joi.string()
            .min(6)
            .max(40)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(50)
            .required()
    };
    return Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .max(40)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(50)
            .required()
    };
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;