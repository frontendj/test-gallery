import axios from 'axios';
import { FetchedImage } from 'types/types';

const BASE_URL = 'https://picsum.photos/v2';

export const fetchImages = async (page = 1, limit = 10): Promise<FetchedImage[]> => {
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
