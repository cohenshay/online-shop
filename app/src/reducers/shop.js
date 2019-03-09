const initialState = {
  roomMessages: [],
  itemsToPay:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
    return { ...state, itemsToPay:[...state.itemsToPay,action.data]  };
    case "GET_ALL_ITEMS":
      return { ...state, items: action.data };
    case "FILTER_BY_CATEGORY":
      return { ...state, items: action.data.items };
    case "GET_ALL_CATEGORIES":
      return { ...state, categories: action.data };
    case "FILTER_TYPES":
      return { ...state, items: action.data };
    case "GET_TYPES_BY_CATEGORY":
      return { ...state, typesByCategory: action.data };
    default:
      return state;
  }
};
