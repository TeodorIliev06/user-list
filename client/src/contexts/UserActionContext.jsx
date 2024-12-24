import { createContext, useContext } from "react";

export const UserActionContext = createContext(null);

export function UserActionContextProvider({ children, onUserDetailsClick }) {
    const contextValue = {
        onUserDetailsClick,
    };

    return (
        <UserActionContext.Provider value={{onUserDetailsClick}}>
            {children}
        </UserActionContext.Provider>
    );
}

export function useUserActionContext() {
    const actionData = useContext(UserActionContext);

    return actionData;
}
