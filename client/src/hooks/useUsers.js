import { useCallback, useEffect, useState } from 'react'

import usersAPI from "../api/users-api";

export function useGetAllUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const result = await usersAPI.getAll();
        setUsers(result);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return [users, isLoading, fetchUsers];
}

export function useGetUserById(userId) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const result = await usersAPI.getOne(userId);
            setUser(result);
            setIsLoading(false);
        })();
    }, [userId]);

    return [user, isLoading];
}

export function useCreateUser() {
    const userCreateHandler =
        async (userData) => await usersAPI.create(userData);

    return userCreateHandler;
};

export function useUpdateUser() {
    const userUpdateHandler = 
        async (userId, userData) => await usersAPI.update(userId, userData);
        
    return userUpdateHandler;
}

export function useDeleteUser() {
    const userDeleteHandler =
        async (userId) => await usersAPI.remove(userId);

    return userDeleteHandler;
};
