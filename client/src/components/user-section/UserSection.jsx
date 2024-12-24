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

    const createUser = useCreateUser();

    const addUserClickHandler = () => setShowAddUser(true);
    const addUserCloseHandler = () => setShowAddUser(false);

    const userDetailsClickHandler = (userId) => {
        setShowUserDetailsById(userId);
    }

    const addUserSaveHandler = async (userData) => {
        try {
            const createdUser = await createUser(userData);

            //Quick fix, should be handled in api call
            await refetchUsers();
            setShowAddUser(false);
        } catch (error) {
            alert(`Failed to create user: ${error.message}`);
        }
    };

    return (
        <section className="card users-container">
            <Search />
            
            <UserList />
            
            {showAddUser && (
                <UserAdd
                    onClose={addUserCloseHandler}
                    onSave={addUserSaveHandler}
                />
            )}

            {/* <UserDetails /> */}

            {/* <UserDelete /> */}

            <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>
            
            <Pagination />
        </section>

    );
}
