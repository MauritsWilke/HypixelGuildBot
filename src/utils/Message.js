function getUserGuildRank(message) {
	let guildRank = message.replace(/(§.)/g, "").replace(/(Guild >|Officer >) (\[.{3,5}\])*\s*/i, "")
	const inverseRegex = new RegExp(guildRank.replace(/\[.*]/, "").replace(/\s/g, "").replace(":", ""))
	guildRank = guildRank.replace(inverseRegex, "").replace(/\s/g, "").replace(":", "")
	return guildRank || null
}

function getUserRank(message) {
	const noMarkdown = message.replace(/(§.)/g, "").replace(/(Guild >|Officer >)\s*/i, "")
	const noGuildRank = noMarkdown.replace(/\[.{1,6}]:/, "")
	const inverseRegex = new RegExp(noGuildRank.replace(/\[.*]/, "").replace(/\s*/g, ""))
	const userRank = noGuildRank.replace(inverseRegex, "").replace(/\s*/g, "")
	return userRank || null
}

function getUsername(message) {
	const noMarkdown = message.replace(/(§.)/g, "")
	const username = noMarkdown.replace(/(Guild >|Officer >) (\[.{3,9}\])*\s*/, "").replace(/ .*/, "")
	return username.replace(":", "")
}

class Message {
	constructor(jsonMSG) {
		this.author = {
			username: getUsername(jsonMSG.extra[0].text),
			uuid: jsonMSG.extra[0].clickEvent.value.replace("/viewprofile ", ""),
			rank: getUserRank(jsonMSG.extra[0].text),
			guildRank: getUserGuildRank(jsonMSG.extra[0].text)
		};
		this.content = jsonMSG.extra[1].text;
		this.channel = jsonMSG.extra[0].text.startsWith(`§3Officer >`) ? "o" : "g";
		this.timestamp = Date.now()
	}
}

module.exports = {
	Message
}