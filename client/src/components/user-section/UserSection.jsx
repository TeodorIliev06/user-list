import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserAdd from "./user-add/UserAdd";
import UserDelete from "./user-delete/UserDelete";
import UserDetails from "./user-details/UserDetails";
import UserList from "./user-list/UserList";
import UserEdit from "./user-edit/UserEdit";

import { useCreateUser, useGetAllUsers } from "../../hooks/useUsers";
import { useState } from "react";
import { UserActionContextProvider } from "../../contexts/UserActionContext";

export default function UserSection() {
    const [users, isLoading, refetchUsers] = useGetAllUsers();
    const [showAddUser, setShowAddUser] = useState(false);
    const [showUserDetailsById, setShowUserDetailsById] = useState(null);
    const [showUserDeleteById, setShowUserDeleteById] = useState(null);
    const [showUserEditById, setShowUserEditById] = useState(null);

    const createUser = useCreateUser();

    const addUserClickHandler = () => setShowAddUser(true);
    const addUserCloseHandler = () => setShowAddUser(false);

    const userDetailsClickHandler = (userId) => {
        setShowUserDetailsById(userId);
    }

    const userDeleteClickHandler = (userId) => {
        setShowUserDeleteById(userId);
    }

    const userEditClickHandler = (userId) => {
        setShowUserEditById(userId);
    }

    const addUserSaveHandler = async (userData) => {
        try {
            await createUser(userData);
            await refetchUsers();

            setShowAddUser(false);
        } catch (error) {
            alert(`Failed to create user: ${error.message}`);
        }
    };

    const editUserHandler = async () => {
        try {
            await refetchUsers();

            setShowUserEditById(null);
        } catch (error) {
            alert(error.message);
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

    const userActionContext = {
        onUserDetailsClick: userDetailsClickHandler,
        onUserDeleteClick: userDeleteClickHandler,
        onUserEditClick: userEditClickHandler
    };

    return (
        <UserActionContextProvider value={userActionContext}>
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

                {showUserEditById && (
                    <UserEdit
                        userId={showUserEditById}
                        onClose={() => setShowUserEditById(null)}
                        onEdit={editUserHandler}
                    />
                )}

                <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

                <Pagination />
            </section>
        </UserActionContextProvider>


    );
}
