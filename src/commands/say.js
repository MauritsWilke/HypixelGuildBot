const Command = require(`../templates/command`)

module.exports = class extends Command {
	constructor() {
		super({
			name: "say",
			settings: {
				devOnly: true,
				"cooldown": 2000,
			}
		})
	}

	async run(bot, message, args) {
		bot.chat(args.join(" "))
	}
}