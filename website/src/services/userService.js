import { API_BASE_URL, USER_PROFILE_ENDPOINT } from './apiConstants';
import { handleApiError } from './apiErrorHandling';

export const getUserInfo = async (token) => {
    try {
        const request = await fetch(`${API_BASE_URL}${USER_PROFILE_ENDPOINT}`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const response = await request.json();
        return response.status === 200 ? response : handleApiError(response);
    } catch(error) {
        console.error(`An error has occurred while retrieving user information : ${error}`);
    }
}

export async function updateUserInfo(token, userName) {
    try {
        const request = await fetch(`${API_BASE_URL}${USER_PROFILE_ENDPOINT}`, {
            method: 'PUT',
            headers: { 
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userName })
        });

        const response = await request.json();
        return response.status === 200 ? response : handleApiError(response);
    } catch (error) {
        console.error(`An error occurred while updating user info : ${error}`);
    }
}