import { cartReducer } from './cartReducer';
import { modalReducer } from './modalReducer';
import { commentReducer } from './commentReducer';
import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { uiReducer } from './uiReducer';
import { productReducer } from './productReducer';
import { orderReducer } from './orderReducer';
import { responsiveReducer } from './responsiveReducer';
import { authReducer } from './authReducer';
import { routesReducer } from './routesReducer';

// Método combineReducers
// Combina os reducers de vários arquivos que eu tiver criado

export default combineReducers({
  cartState: cartReducer,
  modalState: modalReducer,
  commentState: commentReducer,
  categoryState: categoryReducer,
  uiState: uiReducer,
  productState: productReducer,
  orderState: orderReducer,
  responsiveState: responsiveReducer,
  authState: authReducer,
  routesState: routesReducer,
});