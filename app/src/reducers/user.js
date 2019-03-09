const initialState = {
  userMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_MESSAGES":
      return { ...state, userMessages: action.data };
    default:
      return state;
  }
};
