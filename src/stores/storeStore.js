import ApiService from '../data/api_service';
import qs from 'qs';

export const fetchStores = async (params) => {
    const result = await ApiService.get({
        subUrl: `/displayStores?${qs.stringify(params)}`,
    });
    return result;
    };
    
    export const fetchStoresAsPairs = async (params) => {
        const result = await ApiService.get({
            subUrl: `/displayPairStores?${qs.stringify(params)}`,
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
        
        export const rejectStore = async (id, reason) => {
            await ApiService.post({
                subUrl: '/rejectStore',
        
                data: {
                    'id':id,
                    'response':reason
                },
            });  
        };
        export const acceptStore = async (id) => {
            await ApiService.post({
                subUrl: '/acceptStore',
        
                data: {
                    'id':id,
                },
            });  
        };
        
        export const deleteRejectStore = async (id) => {
            await ApiService.post({
                subUrl: '/deleteRejectedStore',
        
                data: {
                    'id':id,
                },
            });  
        };