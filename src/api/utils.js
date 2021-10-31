import axios from "axios";







// Utility functions for making api calls
export const getRequest = async (uri,headers) => {
    try {
      
        let URL = uri
        let response = await axios.get(URL,headers);
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
		let URL = uri
		let response = await axios.post(URL, data, headers);

		return response;
	} catch (error) {
		return {
			data: null,
			error: error
		};
	}
};



export const deleteRequest = async (uri, headers) => {
	try {
		let URL = uri
		let response = await axios.delete(URL, headers);

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



export const putRequest = async (uri, data, headers) => {
	try {
		let URL = uri
		let response = await axios.put(URL, data, headers);

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

export const SendSpecifiedRequest = async (uri, data, headers, method) => {
	let promise;
	switch (method) {
		case "POST":
			promise = postRequest(uri,data,headers)
			return promise
		case "GET":
			promise = getRequest(uri,data,headers)
			return promise
		case "PUT":
			promise = putRequest(uri,data,headers)
			return promise
		case "DELETE":
			promise = deleteRequest(uri,data,headers)
			return promise
		default:
			break;
	}
};