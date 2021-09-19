const Command = require(`../templates/command`)
const { playerStats } = require(`../utils/api/hypixel`)

module.exports = class extends Command {
	constructor() {
		super({
			name: "bw",
		})
	}

	async run(bot, message, args) {
		const IGN = args?.[0] ? args[0] : message.author.username;
		const player = await playerStats(IGN);

		if (!player?.stats?.Bedwars) return bot.chat("This user has not played Bedwars")
		let star = player.achievements.bedwars_level;
		let FKDR = player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars || player?.stats?.Bedwars?.final_kills_bedwars || 0;
		let WLR = player.stats.Bedwars.wins_bedwars / (player.stats.Bedwars.games_played_bedwars - player.stats.Bedwars.wins_bedwars) || player?.stats?.Bedwars.wins_bedwars || 0;

		bot.chat(`${player.displayname}: Star: [${star}] | FKDR: [${+FKDR.toFixed(2)}] | WLR: [${+WLR.toFixed(2)}]`)
	}
}