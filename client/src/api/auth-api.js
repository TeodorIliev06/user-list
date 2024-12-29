import requster from "./requester";

const BASE_URL = "http://localhost:3030/users"

export const login = async (email, password) => {
    const result = await requster.post(`${BASE_URL}/login`, { email, password }, true);
    localStorage.setItem("auth", JSON.stringify(result));

    return result;
};
