import { cartReducer } from './cartReducer';
import { modalReducer } from './modalReducer';
import { combineReducers } from 'redux';

// Método combineReducers
// Combina os reducers de vários arquivos que eu tiver criado

export default combineReducers({
  cardState: cartReducer,
  modalState: modalReducer,
});