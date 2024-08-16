// src/services/apiService.js
import ApiService from '../data/api_service';
import qs from 'qs';

export const fetchCategories = async (params) => {
    const result = await ApiService.get({
        subUrl: `/displayCategory1?${qs.stringify(params)}`,
    });
    return result;
    };

export const fetchCategoriesAsPairs = async () => {
    const result = await ApiService.get({
        subUrl: '/displayPairCategory1',
    });
    return result;
    };

export const createOrUpdateCategory = async (formData, isUpdate) => {
const endpoint = isUpdate ? '/updateCategory1' : '/createCategory1';
await ApiService.post({
    subUrl: endpoint,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
});
};

export const updateCategoryStatus = async (id, active) => {
    await ApiService.post({
        subUrl: '/activeOrUnactiveCategory1',

        data: {
            'id':id,
            'active':active ? 1 : 0
        },
    });  
};

export const deleteCategory = async (id) => {
await ApiService.post({
    subUrl: '/deleteCategory1',
    data: { id },
});
};
