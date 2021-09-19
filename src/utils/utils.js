/**
 * Log a countdown
 * @param {Number} seconds 
 */

function consoleClock(seconds) {
	let timesRun = 0;
	const countdown = setInterval(function () {
		timesRun += 1;
		if (timesRun === seconds) {
			clearInterval(countdown);
		}
		process.stdout.write(`Attempting to relog in [${seconds - timesRun > 9 ? seconds - timesRun : `0${30 - timesRun}`}]\r`)

	}, 1000);
}


/**
 * Purge X members of the guild
 * ! MADE TO WORK FOR THE BEDWARS GUILD 
 */
const { guildData, playerStats } = require(`./api/hypixel`)
async function purgeGuild(members) {
	if (!members) return new Error("This function requires an input")
	const guild = await guildData("bedwars")
	const guildMembers = [...guild.members]

	let memberStats = [];
	for (member of guildMembers) {
		if (member.rank === "Waiting Room") {
			const player = await playerStats(member.uuid)
			const lastOnline = Date.now() - player.lastLogin

			let star = player.achievements.bedwars_level;
			let FKDR = player.stats.Bedwars.final_kills_bedwars / player.stats.Bedwars.final_deaths_bedwars || player?.stats?.Bedwars?.final_kills_bedwars || 0;
			let index = (star * FKDR * FKDR) / 10;

			let totalGexp = 0;
			for (const [k, exp] of Object.entries(member.expHistory)) totalGexp += exp

			memberStats.push({
				username: player.displayname,
				lastOnline: lastOnline,
				index: index,
				weeklyGexp: totalGexp,
				score: (index + index + (totalGexp / 10000)) * +(lastOnline < 604800000)
			})
		}
	}
	memberStats.sort(dynamicSort("score"))

	let purgeList = memberStats.slice(0, members);
	return purgeList
}

module.exports = {
	consoleClock,
	purgeGuild
}

function dynamicSort(property) {
	let sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a, b) {
		let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}