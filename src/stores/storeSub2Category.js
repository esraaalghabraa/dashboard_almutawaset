// src/services/apiService.js
import ApiService from '../data/api_service';
import qs from 'qs';

export const fetchSub2Categories = async (params) => {
const result = await ApiService.get({
    subUrl: `/displayCategory3?${qs.stringify(params)}`,
});
return result;
};

export const fetchSub2CategoriesAsPairs = async (category2_id) => {
    const result = await ApiService.get({
        subUrl: `/displayPairCategory3?category2_id=${category2_id}`,
    });
    return result;
    };

export const createOrUpdateSub2Category = async (formData, isUpdate) => {
const endpoint = isUpdate ? '/updateCategory3' : '/createCategory3';
await ApiService.post({
    subUrl: endpoint,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
});
};

export const updateSub2CategoryStatus = async (id, active) => {
    await ApiService.post({
        subUrl: '/activeOrUnactiveCategory3',
        data: {
            'id':id,
            'active':active ? 1 : 0
        },
    });  
};

export const deleteSub2Category = async (id) => {
await ApiService.post({
    subUrl: '/deleteCategory3',
    data: { id },
});
};
