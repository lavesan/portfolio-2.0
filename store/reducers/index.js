import { cartReducer } from './cartReducer';
import { modalReducer } from './modalReducer';
import { commentReducer } from './commentReducer';
import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { uiReducer } from './uiReducer';
import { productReducer } from './productReducer';

// Método combineReducers
// Combina os reducers de vários arquivos que eu tiver criado

export default combineReducers({
  cartState: cartReducer,
  modalState: modalReducer,
  commentState: commentReducer,
  categoryState: categoryReducer,
  uiState: uiReducer,
  productState: productReducer,
});