import ApiService from '../data/api_service';
import qs from 'qs';

export const fetchAds = async (params) => {
    const result = await ApiService.get({
        subUrl: `/displayProducts?${qs.stringify(params)}`,
    });
    return result;
    };
    
export const updateAdStatus = async (id, active) => {
    console.log(active)
    await ApiService.post({
        subUrl: '/activeOrUnactiveProduct',

        data: {
            'id':id,
            'active':active
        },
    });  
};