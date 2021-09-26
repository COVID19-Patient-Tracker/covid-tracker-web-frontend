import axios from "axios";

import {BASE_URL} from '../shared/config'




// Utility functions for making api calls
export const getRequest = async (uri) => {
    try {
		let URL = BASE_URL + uri
        let response = await axios.get(URL);

        return {
            data: response.data,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error,
        }
    }
}


export const postRequest = async (uri, data, headers) => {
	try {
		let URL = BASE_URL + uri
		let response = await axios.post(URL, data, headers);

		return response;
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};



export const deleteRequest = async (uri) => {
	try {
		let URL = BASE_URL + uri
		let response = await axios.delete(URL);

		return {
			data: response.data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};



export const putRequest = async (uri, data) => {
	try {
		let URL = BASE_URL + uri
		let response = await axios.put(URL, data);

		return {
			data: response.data,
			error: null
		};
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};