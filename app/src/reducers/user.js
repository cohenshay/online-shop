const initialState = {
  userMessages: [],
  newNotifiactions:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_MESSAGES":
      return { ...state, userMessages: action.data };
    case "GET_USER_LIKES":

      return {
        ...state,
        userLikes: action.data.map(item => {
          return {
            "subject": item.subject,
            "likes": item.messages.map(message => message.likes)
          }
        })
        , userDisLikes: action.data.map(item => {
          return {
            "subject": item.subject,
            "likes": item.messages.map(message => message.disLikes)
          }
        })
      };
    case "NEW_NOTIFICATION":
    
      return { ...state, newNotifiactions:[...state.newNotifiactions ,action.data] };
    default:
      return state;
  }
};
