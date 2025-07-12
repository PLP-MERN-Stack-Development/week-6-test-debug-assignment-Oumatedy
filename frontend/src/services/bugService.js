import axios from 'axios';

const API_URL = '/api/bugs';

export const getBugs = () => axios.get(API_URL).then(res => res.data);
export const createBug = (bug) => axios.post(API_URL, bug).then(res => res.data);
export const updateBug = (id, bug) => axios.put(`${API_URL}/${id}`, bug).then(res => res.data);
export const deleteBug = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
