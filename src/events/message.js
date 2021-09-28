const { guildData } = require(`../utils/api/hypixel`)
const { purgeGuild } = require(`../utils/utils`)
const Cache = require(`../utils/cache`)

const joinedCache = new Cache(604800000)

module.exports = async (bot, jsonMSG) => {
	if (jsonMSG?.extra?.[3]?.clickEvent?.value.includes(`/guild accept`)) {
		const username = jsonMSG?.extra?.[3]?.clickEvent?.value.replace(`/guild accept `, "")
		if (joinedCache.get(username)) {
			const timeToRejoin = msToBest(joinedCache.get(username, true).expiration - Date.now())
			return bot.chat(`/msg ${username} You have recently left the guild, please wait ${timeToRejoin} before rejoining. | You can rejoin at: ${new Date(joinedCache.get(username, true).expiration).toLocaleString('en-US')} | #${Date.now()}`)
		}

		bot.chat(jsonMSG?.extra?.[3]?.clickEvent?.value)
		await sleep(100)
		bot.chat(`Welcome ${username}! Check out our Discord server => /g discord`)

		joinedCache.set(username, "empty")

		const guild = await guildData("bedwars")
		const memberCount = guild.members.length
		if (memberCount >= 125) {
			const usernameList = await purgeGuild(15)
			for (user of usernameList) {
				bot.chat(`/g kick ${user.username} Guild Purge`)
				await sleep(50)
			}
		}
	}
	if (jsonMSG.text != "You cannot say the same message twice!") return;
	bot.chat(`Error: cannot send the same message twice! | Timestamp ${Date.now()}`)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function msToBest(ms) {
	if (ms >= 31556952000) return Math.floor(ms / 31556952000) + " year(s)"
	if (ms >= 2629800000) return Math.floor(ms / 2629800000) + " month(s)"
	if (ms >= 604800016) return Math.floor(ms / 604800016) + " week(s)"
	if (ms >= 86400000) return Math.floor(ms / 86400000) + " day(s)"
	if (ms >= 3600000) return Math.floor(ms / 3600000) + " hour(s)"
	return Math.floor(ms / 60000) + " minute(s)"
}