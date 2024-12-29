import { login } from "../api/auth-api";

export const useLogin = () => {
	const loginHandler = async () => {
		// Hardcoded credentials
		const email = "admin@abv.bg";
		const password = "admin";

		const { password: _, ...result } = await login(email, password);

		return result;
	};
	return loginHandler;
};
