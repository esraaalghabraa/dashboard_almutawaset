import ApiService from '../data/api_service';
import qs from 'qs';

export const fetchDeliveryAgents = async (params) => {
const result = await ApiService.get({
    subUrl: `/displayDeliveryAgent?${qs.stringify(params)}`,
});
return result;
};

    export const updateDeliveryAgentStatus = async (id, active) => {
        await ApiService.post({
            subUrl: '/activeDeliveryAccount',
            data: {
                'id':id,
                'active':active ? 1 : 0
            },
        });  
    };

    
export const createOrUpdateDeliveryAgent = async (formData, isUpdate) => {
    const endpoint = isUpdate ? '/updateDeliveryAccount' : '/createDeliveryAccount';
    await ApiService.post({
        subUrl: endpoint,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
    });
    };

    export const deleteDeliveryAgent = async (id) => {
        await ApiService.post({
            subUrl: '/deleteDeliveryAccount',
            data: { id },
        });
        };