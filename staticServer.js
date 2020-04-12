require("dotenv").config();

const express = require("express");
const serverStatic = require("serve-static");
const app = express();

const parseEnvValue = (value) => {
	if (value.startsWith("num_")) {
		return Number(value.replace("num_", "").trim());
	} else if (value.startsWith("bool_")) {
		return value.includes("true");
	} else {
		return value;
	}
};

app.use(serverStatic(__dirname));
app.listen(parseEnvValue(process.env.PORT), parseEnvValue(process.env.HOST));
app.get("*", (req, res) => res.sendFile(require("path").join(__dirname, "./index.html")));


console.log(parseEnvValue(process.env.SERVICE_NAME) + " listening on", parseEnvValue(process.env.PORT));