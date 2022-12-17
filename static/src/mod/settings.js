const settings = [
	{
		key: 'disableDeathPenalty',
		name: 'Disable Death Penalty',
		type: 'boolean',
		default: false,
		cheat: true,
	},
];

const values = init();
save();

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
	// console.debug(`Setting ${key} to ${val}`);
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

const config = (key) => {
	switch (key) {
		case 'timeLose':
			// console.log(window.noDeath === true);
			// throw new Error();
			return window.noDeath === true ? 0 : 20;
	}
};

// Wow, Closure Compiler is weird when it comes to imports and exports
// Hacky fix that might be fixable by switching to Vite
window.peng = { getSetting, setSetting, settings };

export { getSetting, setSetting, settings };
