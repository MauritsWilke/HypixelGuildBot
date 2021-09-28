require(`dotenv`).config()
const mineflayer = require(`mineflayer`)
const options = {
	"host": "mc.hypixel.net",
	"auth": "microsoft",
	"username": process.env.MINECRAFT_USERNAME,
	"password": process.env.MINECRAFT_PASSWORD,
}
let bot = mineflayer.createBot(options);
function bindEvents(bot) {
	["commandHandler", "eventHandler"].forEach(handler => {
		require(`./handlers/${handler}`)(bot)
	});
	[`end`, `kicked`].forEach(event => {
		bot.on(event, function () {
			setTimeout(relog, 30000);
		})
	})
	function relog() {
		console.log("Reconnecting to the server...");
		bot = mineflayer.createBot(options);
		bindEvents(bot);
	}
}
bindEvents(bot);