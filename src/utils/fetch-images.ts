import axios from 'axios';
import { FetchedImage, Limit, Page } from 'types/types';

type QueryKey = [string, Page, Limit];

const BASE_URL = 'https://picsum.photos/v2';

export const fetchImages = async ({ queryKey }: { queryKey: QueryKey }): Promise<FetchedImage[]> => {
    const [, page, limit] = queryKey;
    try {
        const response = await axios.get<FetchedImage[]>(`${BASE_URL}/list`, {
            params: {
                limit,
                page,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};
