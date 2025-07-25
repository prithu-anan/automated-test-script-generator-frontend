export const API_BASE_URL = 'http://localhost:8000/api/v1';

export const getAuthHeaders = () => {
    const token = localStorage.getItem("atsg_jwt");
    return {
        Authorization: `Bearer ${token}`,
    };
}; 