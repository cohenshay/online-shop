import axios from 'axios';

export const addItem = (formData) => {
    return (dispatch, getState) => {

        const config = {
            
            headers: {
                authorization: getState().auth.uid || localStorage.getItem('clientToken') ,
                "content-type": "multipart/form-data"
            }
        }

        axios.post(`http://localhost:5000/api/shop/addItem`, formData,config)
            .then((response) => console.log(response)).catch((err) => console.log(err))
    }
}
