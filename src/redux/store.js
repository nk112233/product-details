import { createStore, combineReducers } from 'redux';  // Correct source is 'redux'
import { categoryReducer, productReducer } from './reducers';

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
});

const store = createStore(rootReducer);

export default store;
