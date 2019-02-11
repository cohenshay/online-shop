const initialState = {
  roomMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ITEMS":
      return { ...state, items: action.data };
    case "GET_ALL_CATEGORIES":
      return { ...state, categories: action.data };
    default:
      return state;
  }
};
