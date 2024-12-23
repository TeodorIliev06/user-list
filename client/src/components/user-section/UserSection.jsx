import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserAdd from "./user-add/UserAdd";
import UserDelete from "./user-delete/UserDelete";
import UserDetails from "./user-details/UserDetails";
import UserList from "./user-list/UserList";

import { useCreateUser } from "../../hooks/useUsers";
import { useState } from "react";

export default function UserSection() {
    const [users, setUsers] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const createUser = useCreateUser();

    const addUserClickHandler = () => setShowAddUser(true);
    const addUserCloseHandler = () => setShowAddUser(false);

    const addUserSaveHandler = async (userData) => {
        try {
            const createdUser = await createUser(userData);

            //Quick fix, should be handled in api call
            setUsers((oldUsers) => [...oldUsers, createdUser]);
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
