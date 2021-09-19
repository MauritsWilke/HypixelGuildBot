const { guildData } = require(`../utils/api/hypixel`)
const { purgeGuild } = require(`../utils/utils`)

module.exports = async (bot, jsonMSG) => {
	if (jsonMSG?.extra?.[3]?.clickEvent?.value.includes(`/guild accept`)) {
		bot.chat(jsonMSG?.extra?.[3]?.clickEvent?.value)
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