    import ApiService from '../data/api_service';
    import qs from 'qs';

    export const fetchTraders = async (params) => {
    const result = await ApiService.get({
        subUrl: `/displayTraders?${qs.stringify(params)}`,
    });
    return result;
    };

    export const fetchMarketers = async (params) => {
        const result = await ApiService.get({
            subUrl: `/displaySellers?${qs.stringify(params)}`,
        });
        return result;
        };

    export const fetchCustomers = async (params) => {
        const result = await ApiService.get({
            subUrl: `/displayUsers?${qs.stringify(params)}`,
        });
        return result;
        };

        export const updateUserStatus = async (id, active) => {
            await ApiService.post({
                subUrl: '/activeOrUnactiveUser',
                data: {
                    'id':id,
                    'active':active ? 1 : 0
                },
            });  
        };