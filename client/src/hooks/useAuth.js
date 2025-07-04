import { useCallback, useEffect } from "react";
import { login } from "../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
    const { changeAuthState, isAuthenticated, isLoading } = useAuthContext();

    const loginHandler = useCallback(async () => {
        try {
            const email = "admin@abv.bg";
            const password = "admin";

            const { password: _, ...result } = await login(email, password);
            changeAuthState(result);

            return result;
        } catch (error) {
            changeAuthState({});
            
            throw error;
        }
    }, [changeAuthState]);

    useEffect(() => {
        if (!isAuthenticated && isLoading) {
            loginHandler();
        }
    }, [isAuthenticated, isLoading]);

    return loginHandler;
};
