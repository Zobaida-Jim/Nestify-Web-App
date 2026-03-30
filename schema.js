const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0), //price can't be negative
        country: Joi.string().required(),
        location: Joi.string().required(),
          category: Joi.string().valid("Trending", "Rooms", "Iconic Cities", "Mountains", "Homes", "Castles", "Amazing Pools", "Campings", "Farms", "Arctic", "Beach", "Design", "Domes", "Boats").required(),
        image: Joi.string().allow("", null),//Image can be null value or empty, because we have default img
    }).required() //listing (new listing) must be required
})

// joi schema for reviews
module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})