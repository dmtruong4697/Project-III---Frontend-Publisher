const initialState = {
    currentEvent: null,
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EVENT':
        return {
          ...state,
          currentEvent: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default eventReducer;
  