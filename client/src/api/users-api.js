import * as request from './requester';

const BASE_URL = 'http://localhost:3030/jsonstore/users';

export const getAll = async () => {
	const result = await request.get(BASE_URL);
	const users = Object.values(result);

	return users;
};

const create = (userData) => request.post(`${BASE_URL}`, userData);

const usersAPI = {
	getAll,
	create,
};

export default usersAPI;
