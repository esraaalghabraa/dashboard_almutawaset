import ApiService from '../data/api_service';
import qs from 'qs';

export const fetchStores = async (params) => {
    const result = await ApiService.get({
        subUrl: `/displayStores?${qs.stringify(params)}`,
    });
    return result;
    };
    
    export const fetchStoresAsPairs = async () => {
        const result = await ApiService.get({
            subUrl: '/displayPairStores',
        });
        return result;
        };

export const updateStoreStatus = async (id, active) => {
    console.log(active)
    await ApiService.post({
        subUrl: '/activeOrUnactiveStore',

        data: {
            'id':id,
            'active':active
        },
    });  
};