import axios from 'axios';
import * as collection from './collection';

export const makeRequest = (endpoint, method = null, token = null, data = null) => {
	const url = collection.parseEnvValue(process.env.BASE_URL) + endpoint;
	const options = collection.getOptions(url, method, token, data);
	return new Promise((resolve, reject) => {
		axios(options)
			.then((res) => resolve({ value: res.data }))
			.catch((error) => {
				const _err = error && error.response && error.response.data || { errors: "Something went wrong" };
				if (_err && _err.errors) {
					alert(collection.getStringFromJson(_err.errors));
				} else {
					alert(String(_err));
				}
				resolve({ error: error })
			});
	});
}