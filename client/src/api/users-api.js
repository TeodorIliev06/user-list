import * as request from './requester';

//TODO: fix authentication when using data/testUsers
const BASE_URL = 'http://localhost:3030/jsonstore/users';

export const getAll = async () => {
	const result = await request.get(BASE_URL);
	const users = Object.values(result);

	return users;
};

export const getOne = (userId) => request.get(`${BASE_URL}/${userId}`);

const create = (userData) => request.post(`${BASE_URL}`, userData);
const remove = (userId) => request.del(`${BASE_URL}/${userId}`);
const update = (userId, userData) =>
	request.put(`${BASE_URL}/${userId}`, userData);

const usersAPI = {
	getAll,
	getOne,
	create,
	remove,
	update
};

export default usersAPI;
