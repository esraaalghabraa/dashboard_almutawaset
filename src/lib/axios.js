import axios from "axios";

const axiosClient = axios.create();

axiosClient.interceptors.request.use((config) => {  
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token && config.needToken) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        try{
            const {response} = error;
            if (response.status === 401){
                localStorage.removeItem('ACCESS_TOKEN')
            }
        }catch (err){
            console.error(err);
        }
        throw error;
    }
)

export default axiosClient;