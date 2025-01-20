import axios from "axios";

async function fetchData<T>(url: string, initialData: T): Promise<{ data: T; error: Error | null }> {
    try {
        const response = await axios.get<T>(url);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: initialData, error: error as Error };
    }
}

export default fetchData;