import axiosClient from '../lib/axios';
import { message } from 'antd';

const ApiService = {
    get: async ({
        baseURL = 'http://localhost:8000/web',
        needToken = true,
        params = {},
        subUrl,
        headers = {},
        delay = 3000, // Add a delay parameter (default is 0, no delay)
    }) => {
        // Create a function that returns a promise that resolves after the specified delay
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
        try {
            // Wait for the specified delay time
            await sleep(delay);
    
            const response = await axiosClient.get(subUrl, {
                baseURL,
                params,
                needToken,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            });
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },
    
    post: async ({ 
        baseURL = 'http://localhost:8000/web',
        needToken = true,
        subUrl,
        headers = {},
        data
    }) => {
        try {
            const response = await axiosClient.post(subUrl, data, {
                baseURL,
                needToken,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            });
            message.success(response.data.message)
            return response.data;
        } catch (error) {
            console.log(error.response.data.message)
            message.error(error.response.data.message)
            throw error;
        }
    }
}

export default ApiService;