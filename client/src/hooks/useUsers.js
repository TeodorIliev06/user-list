import { useCallback, useEffect, useState } from 'react'

import usersAPI from "../api/users-api";

// Walkaround of request.getAll return only an array as response
export function useGetAllUsers({ criteria, value, currentPage, pageSize }) {
    const [users, setUsers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const offset = (currentPage - 1) * pageSize;

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            let query = '';
            let countQuery = '';
            
            query = `?offset=${offset}&pageSize=${pageSize}`;
            
            if (criteria && value) {
                const encodedValue = encodeURIComponent(`"${value}"`);
                const searchParams = `where=${criteria} LIKE ${encodedValue}`;
                query += `&${searchParams}`;
                countQuery = `?${searchParams}`;
            }

            // Make two requests:
            // 1. Get the paginated data
            // 2. Get all items (without pagination) to count total
            const [paginatedResult, totalResult] = await Promise.all([
                usersAPI.getAll(query),
                usersAPI.getAll(countQuery)
            ]);

            setUsers(paginatedResult);
            setTotalItems(totalResult.length);
        } catch (err) {
            alert(err.message || "Failed to fetch users.");
        } finally {
            setIsLoading(false);
        }
    }, [criteria, value, offset, pageSize]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return [users, totalItems, isLoading, fetchUsers];
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

export function useGetUserPagination(initialPage = 1, initialPageSize = 5) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const changePage = (page, newPageSize = pageSize) => {
        setCurrentPage(page);
        setPageSize(newPageSize);
    };

    return [currentPage, pageSize, changePage];
}
