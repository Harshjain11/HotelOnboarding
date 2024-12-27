const Joi = require("joi");

const hotelSchema = Joi.object({
    hotel:Joi.object({ 
        name:Joi.string().required(),
        address:Joi.string().required(),
        logo:Joi.string().required(),

    }).required()
});

module.exports= hotelSchema;

const guestSchema = Joi.object({
    guest:Joi.object({
        name:Joi.string().required(),
        number:Joi.number()
        .integer() // Ensure it's an integer
        .min(7000000000) // Minimum value: 1000000000 (10 digits)
        .max(9999999999) // Maximum value: 9999999999 (10 digits)
        .required(),
        address:Joi.string().required(),
        purpose:Joi.string().valid('Business','Personal','Tourist').required(),
        dates:Joi.string().required(),
        email:Joi.string().email().required(),
        idProof:Joi.string().valid('Aadhar Card','Pan Card','Passport').required()
    }).required()
});


module.exports= guestSchema;