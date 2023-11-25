import { GetEndpointResponse } from "./types";

const SERVER_ENDPOINT = process.env.NODE_ENV === "production" ?  "api/" : "http://localhost:8080";

async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        if (isJson && data.errors !== null) {
            throw new Error(JSON.stringify(data.errors));
        }

        throw new Error(data.message || response.statusText);
    }

    return data as T;
}
export async function getDataFromEndPoint(credentials: any, endpoint: string, method: string): Promise<any> {

    const fetchUrl = SERVER_ENDPOINT + '/' + endpoint

    const isFormData = credentials instanceof FormData;

    if (method == 'GET') {
        const fetchOptions: RequestInit = {
            method: method,
            credentials: "include",
        };
        const response = await fetch(fetchUrl, fetchOptions);

        return handleResponse<GetEndpointResponse>(response).then((data) => data);
    }
    const fetchOptions: RequestInit = {
        method: method,
        credentials: "include",
        body: credentials,
    };
    console.log(credentials);
    if (!isFormData) {
        fetchOptions.headers = {
            'Content-Type': 'application/json'
        };
        fetchOptions.body = JSON.stringify(credentials);
    }
    console.log(fetchOptions.body);
    const response = await fetch(fetchUrl, fetchOptions);

    return handleResponse<GetEndpointResponse>(response).then((data) => data);
}