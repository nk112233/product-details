const initialState = {
    categories: [],
    products: [],
  };
  
  export const categoryReducer = (state = initialState.categories, action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export const productReducer = (state = initialState.products, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return  action.payload;
      default:
        return state;
    }
  };
  