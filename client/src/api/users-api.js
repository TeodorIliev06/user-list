import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/users';

export const getAll = async () => {
	const result = await request.get(BASE_URL);
	const users = Object.values(result);

	return users;
};

const usersAPI = {
	getAll,
};

export default usersAPI;
