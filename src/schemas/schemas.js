import joi from "joi";

const participant = joi.object({
  name: joi.string().trim().min(2).required(),
});

const user = joi.object({
    user: joi.string().trim().required()
}).unknown();

const message = joi.object({
    to: joi.string().trim().min(2).required(),
    text: joi.string().required(),
    type: joi.string().trim().valid('private_message', 'message').required()
})


export default { participant, user, message };
