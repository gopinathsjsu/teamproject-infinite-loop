import { GetEndpointResponse } from "./types";

const SERVER_ENDPOINT = "http://localhost:8080";

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
export async function getDataFromEndPoint(credentials: string, endpoint: string, method: string): Promise<any> {
    const response = await fetch(`${SERVER_ENDPOINT}${endpoint}`, {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: credentials,
    });
    console.log(response);
    return handleResponse<GetEndpointResponse>(response).then((data) => data);
}
