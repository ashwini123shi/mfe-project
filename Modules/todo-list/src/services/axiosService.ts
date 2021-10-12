import axios from "axios";
// API Axios Get Call.
export const get = async (url: string) => {
    const res = await axios.get(url);
    return res;
}
// API Axios Post Call.
export const post = async (url: string, data) => {
    return axios.post(url, data);
}
// API Axios Put Call.
export const put = async (url: string, data) => {
    return axios.put(url, data);
}
// API Axios Delete Call.
export const deleteRecord = async (url: string) => {
    return axios.delete(url);
}