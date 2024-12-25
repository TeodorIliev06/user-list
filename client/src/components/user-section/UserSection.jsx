import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserAdd from "./user-add/UserAdd";
import UserDelete from "./user-delete/UserDelete";
import UserDetails from "./user-details/UserDetails";
import UserList from "./user-list/UserList";

import { useCreateUser, useGetAllUsers } from "../../hooks/useUsers";
import { useState } from "react";
import { UserActionContextProvider } from "../../contexts/UserActionContext";

export default function UserSection() {
    const [users, isLoading, refetchUsers] = useGetAllUsers();
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUserDetailsById, setShowUserDetailsById] = useState(null);
    const [showUserDeleteById, setShowUserDeleteById] = useState(null);

    const createUser = useCreateUser();

    const addUserClickHandler = () => setShowAddUser(true);
    const addUserCloseHandler = () => setShowAddUser(false);

    const userDetailsClickHandler = (userId) => {
        setShowUserDetailsById(userId);
    }

    const userDeleteClickHandler = (userId) => {
        setShowUserDeleteById(userId);
    }

    const addUserSaveHandler = async (userData) => {
        try {
            console.log(userData);

            await createUser(userData);
            await refetchUsers();

            setShowAddUser(false);
        } catch (error) {
            alert(`Failed to create user: ${error.message}`);
        }
    };

    const deleteUserHandler = async () => {
        try {
            await refetchUsers();

            setShowUserDeleteById(null);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <UserActionContextProvider
            onUserDetailsClick={userDetailsClickHandler}
            onUserDeleteClick={userDeleteClickHandler}
        >
            <section className="card users-container">
                <Search />

                <UserList
                    users={users}
                    isLoading={isLoading}
                />

                {showAddUser && (
                    <UserAdd
                        onClose={addUserCloseHandler}
                        onSave={addUserSaveHandler}
                    />
                )}

                {showUserDetailsById && (
                    <UserDetails
                        userId={showUserDetailsById}
                        onClose={() => setShowUserDetailsById(null)}
                    />
                )}

                {showUserDeleteById && (
                    <UserDelete
                        userId={showUserDeleteById}
                        onClose={() => setShowUserDeleteById(null)}
                        onDelete={deleteUserHandler}
                    />
                )}

                <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                <Pagination />
            </section>
        </UserActionContextProvider>


    );
}
