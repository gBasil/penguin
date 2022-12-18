const settings = [
	{
		key: 'disableDeathPenalty',
		name: 'Disable Death Penalty',
		type: 'boolean',
		default: false,
		cheat: true,
	},
	{
		key: 'disableGiftSpawning',
		name: 'Disable Gift Spawning',
		type: 'boolean',
		default: false,
		cheat: false,
	},
	{
		key: 'restartOnDeath',
		name: 'Restart On Death',
		type: 'boolean',
		default: false,
		cheat: false,
	},
];

// Initialize values
let values = init();
save();

// Update settings if localStorage changes
window.addEventListener('storage', e => {
	if (e.key === 'penguinSettings') {
		values = init();
	}
});

/**
 * Initializes the setting values
 */
function init() {
	const defaults = () =>
		settings.reduce((obj, setting) => {
			obj[setting.key] = setting.default;
			return obj;
		}, {});
	
	const values = localStorage.getItem('penguinSettings');
	if (!values) {
		return defaults();
	}
	try {
		return JSON.parse(values);
	} catch {
		return defaults();
	}
}

function save() {
	localStorage.setItem('penguinSettings', JSON.stringify(values));
}

function setSetting(key, val) {
	values[key] = val;
	save();
}

// TODO: Have settings only return new values after a restart
function getSetting(key) {
	const value = values[key];

	// Might be better to do this in the init
	// Either way, ensure that the setting exists
	if (value === undefined) {
		const setting = settings.find((option) => option.key === key);
		if (!setting) {
			throw new Error(`Setting ${key} does not exist`);
		}
		values[key] = setting.default;
		save();
		return setting.default;
	}
	return value;
}

export { getSetting, setSetting, settings };
