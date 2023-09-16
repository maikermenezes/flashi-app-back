import Joi from 'joi';

export const Deck = Joi.object({
    name: Joi.string().required(),
    cardId: Joi.string().required(),
});