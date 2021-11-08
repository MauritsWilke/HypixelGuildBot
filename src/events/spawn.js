const config = require(`../../config.json`)
const { purgeGuild } = require(`../utils/utils`)
const { guildData } = require(`../utils/api/hypixel`)

let spawnCount = 0;
module.exports = async (bot) => {
	spawnCount++
	if (spawnCount == 1) {
		console.log("Checking for guild purge")
		const guild = await guildData("bedwars")
		const memberCount = guild.members.length
		if (memberCount >= 125) {
			const usernameList = await purgeGuild(15)
			for (user of usernameList) {
				bot.chat(`/g kick ${user.username} Guild Purge`)
				await sleep(250)
			}
		}

		bot.chat(`/g join ${config.settings.guild}`)
		config.spawnMessages.forEach(message => {
			bot.chat(message)
		})
		return console.log(`Connected to ${bot._client.socket._host}. Ping: ${bot.player.ping}`)
	}
	console.log(`Bot switched to limbo. Ping: ${bot.player.ping}`)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}