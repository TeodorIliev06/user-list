import * as request from './requester';

//TODO: fix authentication when using data/testUsers
const BASE_URL = 'http://localhost:3030/jsonstore/users';

export const getAll = async () => {
	const result = await request.get(BASE_URL);
	const users = Object.values(result);

	return users;
};

const create = (userData) => request.post(`${BASE_URL}`, userData);

export const getOne = (userId) => request.get(`${BASE_URL}/${userId}`);

const usersAPI = {
	getAll,
	getOne,
	create,
};

export default usersAPI;
