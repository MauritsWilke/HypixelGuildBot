const fs = require('fs');

module.exports = (bot) => {
	const eventFiles = fs.readdirSync(`./src/events`).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const event = require(`../events/${file}`);
		const eventName = file.split('.')[0];
		bot.on(eventName, event.bind(null, bot))
	}
}