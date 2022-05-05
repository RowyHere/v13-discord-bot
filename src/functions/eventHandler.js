/*               EVENT FILES               */

module.exports = function( client ) {


const requestEvent = (event) => require(`../events/${event}`)
client.on('messageCreate', (messageCreate) => requestEvent('messageCreate')(messageCreate, client));
client.on('interactionCreate', (interactionCreate) => requestEvent('interactionCreate')(interactionCreate, client));

}

/*               EVENT FILES               */