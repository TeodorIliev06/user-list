export const getAccessToken = () => {
    const authJSON = sessionStorage.getItem("auth");

    if (!authJSON) {
		return "";
	} 

    const authData = JSON.parse(authJSON);
	
    return authData?.accessToken; 
};
