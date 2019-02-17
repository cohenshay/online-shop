import axios from 'axios';

export const getRoomMessages = (roomName, callback) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:5000/api/message/getRoomMessages?roomName=${roomName}`, config)
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



        axios.post(`http://localhost:5000/api/message/saveRoomMessage`, msg, config)
            .then((response) => dispatch({
                type: "SET_ROOM_MESSAGES",
                data: response.data
            })).catch((err) => console.log(err))
    }
}