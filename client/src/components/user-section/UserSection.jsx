import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserAdd from "./user-add/UserAdd";
import UserDelete from "./user-delete/UserDelete";
import UserDetails from "./user-details/UserDetails";
import UserList from "./user-list/UserList";

export default function UserSection() {
    return (
        <section className="card users-container">
            <Search />
            
            <UserList />
            
            {/* <UserAdd /> */}

            {/* <UserDetails /> */}

            {/* <UserDelete /> */}

            <button className="btn-add btn">Add new user</button>
            
            <Pagination />
        </section>

    );
}
