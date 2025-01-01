import { getAccessToken } from "../utils/authUtils";

export async function requester(method, url, data, skipAuth = false) {
	const options = {};

	if (method !== "GET") {
		options.method = method;
	}
	
	const accessToken = getAccessToken();

	if (accessToken && !skipAuth) {
		options.headers = {
			...options.headers,
			"X-Authorization": accessToken,
		};
	}

	if (data) {
		options.headers = {
			...options.headers,
			"Content-Type": "application/json",
		};
		options.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(url, options);

		if (response.status === 204) {
			return;
		}

		const result = await response.json();

		if (!response.ok) {
			throw result;
		}

		return result;
	} catch (error) {
		if (error.status === 401) {
			localStorage.removeItem('auth');

			window.location.reload();
		}
		throw error;
	}
}
export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");

export default {
	get,
	post,
	put,
	del,
};
