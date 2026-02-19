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

    const data: unknown =
        contentType && contentType.includes('application/json') ? await response.json() : await response.text();

    if(!response.ok) {
        if(typeof data === 'string') {
            throw new Error(data);
        }

        if(data && typeof data === 'object') {
            if ('message' in data) throw new Error(String((data as any).message));
            if ('error' in data) throw new Error(String((data as any).error));
        }

        throw new Error('Unexpected API error');
    }

    return data as T;
}