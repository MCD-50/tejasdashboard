export const getOptions = (url, method, token, data) => {
	let options = {
		method: method || 'GET',
		url: url,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
		}
	};

	if (token) {
		options.headers['Authorization'] = token
	}

	if (data) {
		options['method'] = method || 'POST';
		options['data'] = data
	}

	return options;
}

// ----------------------
// JSON HELPER
// ----------------------
// get string from json object
export const getStringFromJson = (jsonData) => {
	try {
		//jsonString = passJsonCheck(jsonString);
		return JSON.stringify(jsonData);
	} catch (exe) {
		// loggingHelper.consoleLog("JSON STRINGYFY", jsonString, exe);
	}
	return jsonData;
};

// get json from the string object
export const getJsonFromString = (jsonString) => {
	try {
		//jsonString = passJsonCheck(jsonString);
		return JSON.parse(jsonString);
	} catch (exe) {
		// loggingHelper.consoleLog("JSON PARSE", jsonString, exe);
	}
	return jsonString;
};

export const parseEnvValue = (value) => {
	if (value.startsWith("num_")) {
		return Number(value.replace("num_", "").trim());
	} else if (value.startsWith("bool_")) {
		return value.includes("true");
	} else {
		return value;
	}
};

export const capitalizeCaseKey = (str, defaultValue = "Unknown") => str && typeof str == "string" && str.charAt(0).toUpperCase() + str.slice(1) || defaultValue;
export const addSpaceInCamelCase = (str, defaultValue = "Unknown") => str && typeof str == "string" && str.replace(/([A-Z])/g, ' $1') || defaultValue;