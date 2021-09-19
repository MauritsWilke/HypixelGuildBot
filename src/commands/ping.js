const Command = require(`../templates/command`)

module.exports = class extends Command {
	constructor() {
		super({
			name: "ping",
		})
	}

	async run(bot, message, args) {
		bot.chat(`Current ping: [${bot.player.ping}ms]`)
	}
}