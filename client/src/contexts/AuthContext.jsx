import { createContext, useContext, useState } from "react";

import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext({
    accessToken: "",
    isAuthenticated: false,
    isLoading: true,
    changeAuthState: (authState = {}) => null,
});
export function AuthContextProvider(props) {
    const [authState, setAuthState] = usePersistedState('auth', {});
    const [isLoading, setIsLoading] = usePersistedState('auth_login', true);

    const changeAuthState = (state) => {
        setAuthState(state);
        setIsLoading(false);
    };

    const contextData = {
        accessToken: authState?.accessToken || "",
        isAuthenticated: !!authState?.accessToken,
        isLoading,
        changeAuthState,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
}
export function useAuthContext() {
    const authData = useContext(AuthContext);
    return authData;
}
