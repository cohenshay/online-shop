
import axios from 'axios';

export const updateUser = (formData) => {
    return (dispatch, getState) => {

        const config = {

            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
                "content-type": "multipart/form-data"
            }
        }

        axios.post(`http://localhost:5000/auth/updateUser`, formData, config)
            .then((response) => {
                localStorage.removeItem('clientToken');
                localStorage.setItem('clientToken', response.data.token);
                localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            }
            ).catch((err) => console.log(err))
    }
}
export const getUserMessages = (params) => {
    return (dispatch, getState) => {

        const config = {

            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.post(`http://localhost:5000/api/user/getUserMessages`, params, config)
            .then((response) => {
                dispatch({ type: "GET_USER_MESSAGES", data: response.data })
            }
            ).catch((err) => console.log(err))
    }
}

