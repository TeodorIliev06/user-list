import { useSearchParams } from "react-router-dom";

import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserAdd from "./user-add/UserAdd";
import UserDelete from "./user-delete/UserDelete";
import UserDetails from "./user-details/UserDetails";
import UserList from "./user-list/UserList";
import UserEdit from "./user-edit/UserEdit";

import { useModals } from "../../hooks/useModals";
import { usePagination } from "../../hooks/usePagination";
import { useCreateUser, useGetAllUsers } from "../../hooks/useUsers";
import { UserActionContextProvider } from "../../contexts/UserActionContext";

export default function UserSection() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, pageSize, changePage] = usePagination();
    const { modalState, openModal, closeModal } = useModals();

    const [users, total, isLoading, refetchUsers] = useGetAllUsers({
        criteria: searchParams.get("criteria") || "",
        value: searchParams.get("value") || "",
        currentPage,
        pageSize,
    });

    const createUser = useCreateUser();

    const addUserClickHandler = () => openModal("userAdd");
    const userDetailsClickHandler = (userId) => openModal("userDetails", userId);
    const userDeleteClickHandler = (userId) => openModal("userDelete", userId);
    const userEditClickHandler = (userId) => openModal("userEdit", userId);

    const addUserSaveHandler = async (userData) => {
        try {
            await createUser(userData);
            await refetchUsers();

            closeModal();
        } catch (error) {
            alert(`Failed to create user: ${error.message}`);
        }
    };

    const editUserHandler = async () => {
        try {
            await refetchUsers();

            closeModal();
        } catch (error) {
            alert(error.message);
        }
    };

    const deleteUserHandler = async () => {
        try {
            await refetchUsers();

            closeModal();
        } catch (error) {
            alert(error.message);
        }
    };

    const searchHandler = (criteria, value) => {
        if (criteria && value) {
            setSearchParams({ criteria, value });

            changePage(1);
        } else {
            setSearchParams({});
        }
    };

    const pageChangeHandler = (newPage, newPageSize) => {
        changePage(newPage, newPageSize);
    };

    const userActionContext = {
        onUserDetailsClick: userDetailsClickHandler,
        onUserDeleteClick: userDeleteClickHandler,
        onUserEditClick: userEditClickHandler,
    };

    const renderModals = () => {
        if (!modalState) {
            return null;
        }

        switch (modalState.type) {
            case "userAdd":
                return <UserAdd onClose={closeModal} onSave={addUserSaveHandler} />;
            case "userDetails":
                return <UserDetails userId={modalState.payload} onClose={closeModal} />;
            case "userDelete":
                return <UserDelete userId={modalState.payload} onClose={closeModal} onDelete={deleteUserHandler} />;
            case "userEdit":
                return <UserEdit userId={modalState.payload} onClose={closeModal} onEdit={editUserHandler} />;
            default:
                return null;
        }
    };

    return (
        <UserActionContextProvider value={userActionContext}>
            <div className="auth">
                <section className="card users-container">
                    <Search onSearch={searchHandler} />

                    <UserList users={users} isLoading={isLoading} />

                    {renderModals()}

                    <button className="btn-add btn" onClick={addUserClickHandler}>
                        Add new user
                    </button>

                    <Pagination
                        totalItems={total}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={pageChangeHandler}
                    />
                </section>
            </div>
        </UserActionContextProvider>
    );
}
