module.exports = class {
	/**
	 * Default command template
	 * @param {Object} config - The command configuration
	 * @param {string} config.name - The name of the command
	 * @param {array} config.aliases - The aliases of the bot
	 * @param {object} config.settings - The settings of the command
	 * @param {boolean} config.settings.locked - Command locked 
	 * @param {boolean} config.settings.devOnly - Command limited to devs
	 * @param {number} config.settings.cooldown - Command cooldown (ms)
	 */
	constructor(config) {
		config = {
			name: "",
			aliases: null,
			settings: {
				"locked": false,
				"devOnly": false,
				"cooldown": 0,
			},
			...config
		}

		Object.assign(this, config)
		this.name = this.name.toLowerCase()
		this.aliases = this.aliases?.map(a => a.toLowerCase())
	}
}