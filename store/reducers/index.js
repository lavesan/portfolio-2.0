import { cartReducer } from './cartReducer';
import { modalReducer } from './modalReducer';
import { commentReducer } from './commentReducer';
import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { uiReducer } from './uiReducer';

// Método combineReducers
// Combina os reducers de vários arquivos que eu tiver criado

export default combineReducers({
  cardState: cartReducer,
  modalState: modalReducer,
  commentState: commentReducer,
  categoryState: categoryReducer,
  uiState: uiReducer,
});