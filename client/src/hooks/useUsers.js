import { useEffect, useState } from 'react'

import usersAPI from "../api/users-api";

export function useGetAllUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        usersAPI.getAll()
            .then(result => {
                setUsers(result);
                setIsLoading(false);
            });
    }, []);

    return [users, isLoading];
};

export function useCreateUser() {
    const userCreateHandler =
        async (userData) => await usersAPI.create(userData);

    return userCreateHandler;
};
