const {InputValidation} = require('ebased/schema/inputValidation');

class CreateClientSchema extends InputValidation {
    constructor(payload, meta) {
        super({
            source: meta.status,
            payload: payload,
            source: "createClient.Lambda",
            specversion:"v1.0.0",
            schema:{
                strict:true,
                dni:{type:Number, required:true},
                name:{type: String, required:true},
                lastname:{type: String, required:true},
                birth:{type:Date, required:true},
            },
        });
    }
}

module.exports = {CreateClientSchema}