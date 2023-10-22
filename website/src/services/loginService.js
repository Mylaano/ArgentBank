import { API_BASE_URL, USER_LOGIN_ENDPOINT } from './apiConstants';
import { handleApiError } from './apiErrorHandling';

export async function connectUser(email, password) {
    try {
        const request = await fetch(`${API_BASE_URL}${USER_LOGIN_ENDPOINT}`, {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        
        const response = await request.json();
        return response.status === 200 ? response : handleApiError(response);
    } catch (error) {
        console.error(`An error has occurred while logging in with the following credentials : ${error}`);
    }
}