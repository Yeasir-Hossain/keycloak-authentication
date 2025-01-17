import Joi from "joi";

export const textCreateValidation = Joi.object({
	text: Joi.string().required().messages({
		"string.empty": "Text is required"
	}),
});
