import axios from 'axios';

export const getRoomMessages = (params, callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:5000/api/roomMessages/getRoomMessages?subject=${params.subject}`, config)
            .then((response) => {
                callback(response);
                return dispatch({
                    type: "GET_ROOM_MESSAGES",
                    data: response.data
                })
            }
            ).catch((err) => callback(err.response))
    }
}

export const setRoomMessages = (msg) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }



        axios.post(`http://localhost:5000/api/roomMessages/saveRoomMessage`, msg, config)
            .then((response) => console.log("setRoomMessages success", response)).catch((err) => console.log(err))
    }
}
export const newNotifiactions = (data) => {
    return (dispatch, getState) => {
        dispatch({type:"NEW_NOTIFICATION",data})
    }
}
export const saveLike = (data) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }



        axios.post(`http://localhost:5000/api/roomMessages/saveLike`, data, config)
            .then((response) => {}).catch((err) => console.log(err))
    }
}
export const getLikes = () => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }



        axios.get(`http://localhost:5000/api/roomMessages/getLikes`, config)
            .then((response) => dispatch({
                type: "GET_USER_LIKES",
                data: response.data
            })).catch((err) => console.log(err))
    }
}