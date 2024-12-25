import { createContext, useContext } from "react";

export const UserActionContext = createContext(null);

export function UserActionContextProvider({ children, onUserDetailsClick, onUserDeleteClick }) {
    const contextValue = {
        onUserDetailsClick,
        onUserDeleteClick,
    };

    return (
        <UserActionContext.Provider value={contextValue}>
            {children}
        </UserActionContext.Provider>
    );
}

export function useUserActionContext() {
    const actionData = useContext(UserActionContext);

    return actionData;
}
