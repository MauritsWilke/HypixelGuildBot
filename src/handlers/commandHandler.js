const { readdirSync } = require('fs');
const { resolve } = require("path");

module.exports = (bot) => {
	bot.commands = new Map()

	const commandFiles = readdirSync(`./src/commands`).filter(file => file.endsWith('.js'))
	for (const files of commandFiles) {
		const commandTemplate = require(resolve(`./src/commands/${files}`));
		const command = new commandTemplate
		bot.commands.set(command.name, command)
		delete require.cache[resolve(`./src/commands/${files}`)]
	}
}