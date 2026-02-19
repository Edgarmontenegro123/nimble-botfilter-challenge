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

    let data: unknown;

    if(contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if(!response.ok) {
        console.log("Data:", data);
        console.log("Data JSON:", JSON.stringify(data, null, 2));

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