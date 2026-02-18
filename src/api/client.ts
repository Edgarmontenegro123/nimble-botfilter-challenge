import {BASE_URL} from '../config.ts';

export async function fetchJson<T>(
    endpoint: string,
    options?: RequestInit
) : Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
        },
        ...options,
    });

    const contentType = response.headers.get('content-type');

    let data: unknown = null;

    if(contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if(!response.ok) {
        if(typeof data === 'string') {
            throw new Error(data);
        }

        if(data && typeof data === 'object' && 'message' in data) {
            throw new Error(String((data as {message?: unknown}).message));
        }

        throw new Error('Unexpected API error');
    }

    return data as T;
}