const { Message } = require('../utils/Message')
const config = require(`../../config.json`)
const fetch = require(`node-fetch`)

module.exports = async (bot, IGN, MSG, translate, jsonMSG) => {
	if (IGN === bot.username) return;
	if (!jsonMSG.extra[0].text.startsWith(`§3Officer >`) && !jsonMSG.extra[0].text.startsWith(`§2Guild >`)) return;

	const message = new Message(jsonMSG)

	fetch(process.env.DISCORD_PRIVATE_URL, {
		"method": "POST",
		"headers": { "Content-Type": "application/json" },
		"body": JSON.stringify({
			"username": `${message.author.rank ?? ""} ${message.author.username} ${message.author.guildRank ?? ""}`,
			"content": `${message.channel === "o" ? "**Officer >**" : "**Guild >**"} ${message.content}`,
			"avatar_url": `https://minotar.net/avatar/${message.author.username}/128.png`,
			"allowed_mentions": {
				"everyone": false,
				"roles": false,
				"users": false
			}
		})

	}).catch(e => console.log(e))

	if (message.channel == "g") {
		fetch(process.env.DISCORD_PUBLIC_URL, {
			"method": "POST",
			"headers": { "Content-Type": "application/json" },
			"body": JSON.stringify({
				"username": `${message.author.rank ?? ""} ${message.author.username} ${message.author.guildRank ?? ""}`,
				"content": `${message.content}`,
				"avatar_url": `https://minotar.net/avatar/${message.author.username}/128.png`,
				"allowed_mentions": {
					"everyone": false,
					"roles": false,
					"users": false
				}
			})
		}).catch(e => console.log(e))
	}

	if (!message.content.startsWith(config.settings.prefix)) return;
	const args = message.content.slice(config.settings.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = bot.commands.get(commandName);
	if (!command) return;
	const { settings } = command;

	if (settings?.devOnly && message.author.uuid !== "11456473-de28-4d36-aa7b-4150fe7859ab") return bot.chat("This command is limited to the developer team")

	console.log(`Guild Bot > ${message.author.username} ran ${commandName}`)
	try {
		bot.chat(`/chat ${message.channel}`)
		await sleep(20) // * This delay is needed for chat switching
		command.run(bot, message, args).catch(e => { bot.chat(e); console.log(e) })
	} catch (e) { bot.chat(e); console.log(e) }
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}