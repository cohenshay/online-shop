import axios from 'axios';

export const getConversation = (params) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }

        axios.get(`http://localhost:5000/api/privateMessages/getConversation?receiver=${params.receiver}`, config)
            .then((response) => {
            
                return dispatch({
                    type: "GET_PRIVATE_MESSAGES",
                    data: response.data
                })
            }
            ).catch((err) => console.log(err.response))
    }
}

export const savePrivateMessage = (data) => {
    return (dispatch, getState) => {

        const config = {
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken'),
            }
        }



        axios.post(`http://localhost:5000/api/privateMessages/savePrivateMessage`, data, config)
            .then((response) =>console.log("savePrivateMessage success",response) ).catch((err) => console.log(err))
    }
}
