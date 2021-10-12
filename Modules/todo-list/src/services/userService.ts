// Import the endpoints.
import { baseUrl, userListUrl, PostUrl, PutUrl, DeleteUrl } from '../configurations/config_url';
// Import the axios Method.
import { get, post, put, deleteRecord } from './axiosService';
import { request, gql } from "graphql-request";
type Data = {
    id: number;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
};

type Support = {
    text: string;
    url: string;
};
type Users = {
    data: Data[];
    page: number;
    per_page: number;
    support: Support;
    total: number;
    total_pages: number;
};


export interface userObject {
    data: Data;
    support: Support;
}



// Axios Get Call - Get all jokes categories.
export const getUserList = async (): Promise<Users> => {
    try {
        const response = await get(userListUrl);
        return response.data;
    }
    catch (error) {
        return error.response;
    }

}

export const getUserById = async (id: number): Promise<Data> => {
    const { data } = await get(`https://reqres.in/api/users/${id}`);
    console.log(data.data);
    return data.data;
};


export const addUser = async (user: {
    first_name: string;
    last_name: string;
    email: string;
}): Promise<Data> => {
    const response = await post(PostUrl, user);
    console.log(response);
    return response.data;

};

export const updateUser = async (user: {
    first_name: string;
    last_name: string;
}): Promise<Data> => {
    const response = await put(`${PutUrl}`, user);
    console.log(response);
    return response.data;

};



// Axios Delete Call - MockableDelete.
export const mockableDeleteData = async () => {
    try {
        const response = await deleteRecord('DeleteUrl');
        console.log('👉 Returned data:', response.data);
    }
    catch (error) {
        console.log(`😱 Axios request failed: ${error}`);
    }
}