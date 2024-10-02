import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await axios.post(`${API_URL}/cargar-archivo/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
