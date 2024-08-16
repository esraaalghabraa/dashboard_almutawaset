// src/services/apiService.js
import ApiService from '../data/api_service';
import qs from 'qs';

export const fetchSub1Categories = async (params) => {
const result = await ApiService.get({
    subUrl: `/displayCategory2?${qs.stringify(params)}`,
});
return result;
};

export const fetchSub1CategoriesAsPairs = async (category1_id) => {
    const result = await ApiService.get({
        subUrl: `/displayPairCategory2?category1_id=${category1_id}`,
    });
    return result;
    };
export const createOrUpdateSub1Category = async (formData, isUpdate) => {
const endpoint = isUpdate ? '/updateCategory2' : '/createCategory2';
await ApiService.post({
    subUrl: endpoint,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
});
};

export const updateSub1CategoryStatus = async (id, active) => {
    await ApiService.post({
        subUrl: '/activeOrUnactiveCategory2',
        data: {
            'id':id,
            'active':active ? 1 : 0
        },
    });  
};

export const deleteSub1Category = async (id) => {
await ApiService.post({
    subUrl: '/deleteCategory2',
    data: { id },
});
};
