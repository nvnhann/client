import axiosClient from './axiosClient';

const tacGiaApi = {
  get() {
    const url = '/api/tacgia';
    return axiosClient.get(url);
  },
  create(data) {
    const url = '/api/tacgia';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/api/tacgia/${id}`;
    return axiosClient.delete(url);
  },
};

export default tacGiaApi;
