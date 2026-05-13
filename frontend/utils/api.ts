const API_BASE_URL = 'http://localhost:8000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('access_token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Handle token expiration/unauthorized
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // window.location.href = '/login'; // Optional: auto redirect
    }

    return response;
};

export const api = {
    get: (endpoint: string, options: RequestInit = {}) =>
        apiFetch(endpoint, { ...options, method: 'GET' }),

    post: (endpoint: string, body: any, options: RequestInit = {}) =>
        apiFetch(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

    patch: (endpoint: string, body: any, options: RequestInit = {}) =>
        apiFetch(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

    delete: (endpoint: string, options: RequestInit = {}) =>
        apiFetch(endpoint, { ...options, method: 'DELETE' }),

    getCategories: () => apiFetch('/places/categories/').then(res => res.json()),
    getPlaces: (params?: string) => apiFetch(`/places/places/${params ? `?${params}` : ''}`).then(res => res.json()),
    getPlace: (slug: string) => apiFetch(`/places/places/${slug}/`).then(res => res.json()),
};
