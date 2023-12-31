import Joi from "joi";

export const Card = Joi.object({
  phrase: Joi.string().required(),
  translation: Joi.string(),
  image: Joi.string(),
  deckId: Joi.string().required(),
});
