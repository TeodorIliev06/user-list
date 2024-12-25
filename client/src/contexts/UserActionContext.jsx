import { createContext, useContext } from "react";

export const UserActionContext = createContext({
    onUserDetailsClick: () => {},
    onUserDeleteClick: () => {},
    onUserEditClick: () => {}
});

export function UserActionContextProvider({ children, value }) {
    return (
        <UserActionContext.Provider value={value}>
            {children}
        </UserActionContext.Provider>
    );
}

export function useUserActionContext() {
    const actionData = useContext(UserActionContext);

    return actionData;
}
