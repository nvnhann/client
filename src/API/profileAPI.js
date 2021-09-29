import axiosClient from './axiosClient';

const profileAPI = {
    create(data){
        const url = '/api/profile';
        return axiosClient.post(url,data);
    },
    get(){
        const url = '/api/profile';
        return axiosClient.get(url);
    }
}

export default profileAPI;