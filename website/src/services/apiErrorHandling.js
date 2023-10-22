export function handleApiError(response) {
    console.error(response.message);
    alert(response.message);
}