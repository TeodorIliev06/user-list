import { useEffect, useState } from 'react'

import usersAPI from "../api/users-api";

export function useGetAllUsers() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		usersAPI.getAll()
			.then(result => setUsers(result));
	}, []);

	return [users, setUsers];
};
