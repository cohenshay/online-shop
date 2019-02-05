const initialState = {
  roomMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ROOM_MESSAGES":
      return { ...state, roomMessages: action.data };
    case "SET_ROOM_MESSAGES":
      if (state.roomMessages && state.roomMessages.length > 1)
        return { ...state, roomMessages: [...state.roomMessages, action.data] };
      if (state.roomMessages)
        return { ...state, roomMessages: [state.roomMessages, action.data] };
      return { ...state, roomMessages: action.data };
    default:
      return state;
  }
};
