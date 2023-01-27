const {CreateClientSchema} = require('../schema/input/createClient');
const {ClientCreatedEvent} = require('../schema/event/clientCreated');
const {emitClientCreated} = require('../service/emitClientCreated');

module.exports = async (commandPayload, commandMeta) => {
    new CreateClientSchema (commandPayload,commandMeta);
    const {dni,name,lastname,birth} = commandPayload;
    const age = calculateAge(birth);
    if (age > 65) throw new Error ('Client must be under 65 years old')
    const clientCreated = {
        dni,
        name,
        lastname,
        birth,
        age
    }
    await emitClientCreated(new ClientCreatedEvent(clientCreated, commandMeta)) 
    return {body: clientCreated};
};

function calculateAge(birth) {
    const birthDate = new Date(birth.substring(0,4), birth.substring(4,6), birth.substring(6,8))
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
}