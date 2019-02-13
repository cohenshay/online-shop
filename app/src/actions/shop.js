import axios from 'axios';

export const addItem = (formData) => {
    return (dispatch, getState) => {

        const config = {

            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
                "content-type": "multipart/form-data"
            }
        }

        axios.post(`http://localhost:5000/api/shop/addItem`, formData, config)
            .then((response) => console.log(response)).catch((err) => console.log(err))
    }
}
export const getAllItems = (formData) => {
    return (dispatch, getState) => {

        const config = {

            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:5000/api/shop/getAllItems`, config)
            .then((response) => dispatch({
                type: "GET_ALL_ITEMS",
                data: response.data
            })).catch((err) => console.log(err))
    }
}
export const getAllCategories = () => {
    return (dispatch, getState) => {

        const config = {

            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:5000/api/shop/getAllCategories`, config)
            .then((response) => dispatch({
                type: "GET_ALL_CATEGORIES",
                data: response.data
            })).catch((err) => console.log(err))
    }
}
export const filterTypes = (types) => {
    return (dispatch, getState) => {

        const config = {

            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }
        const req = {
            types
        };
        axios.post(`http://localhost:5000/api/shop/filterTypes`, req, config)
            .then((response) => dispatch({
                type: "FILTER_TYPES",
                data: response.data
            })).catch((err) => console.log(err))
    }
}