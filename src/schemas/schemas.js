import joi from "joi";

const participantSchema = joi.object({
    name: joi.string().min(2).required()
})

export default participantSchema 