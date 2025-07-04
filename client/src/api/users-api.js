import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/testUsers';

export const getAll = async (query = "") => {
	const result = await request.get(`${BASE_URL}${query}`);
	
	const users = Object.values(result);

	return users;
};

export const getOne = (userId) => request.get(`${BASE_URL}/${userId}`);

const create = (userData) => request.post(`${BASE_URL}`, userData);
const remove = (userId) => request.del(`${BASE_URL}/${userId}`, undefined, true);
const update = (userId, userData) =>
	request.put(`${BASE_URL}/${userId}`, userData, true);

const usersAPI = {
	getAll,
	getOne,
	create,
	remove,
	update
};

export default usersAPI;
