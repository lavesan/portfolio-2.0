import { combineReducers } from 'redux';
import { modalReducer } from './modalReducer';

// Método combineReducers
// Combina os reducers de vários arquivos que eu tiver criado

export default combineReducers({
  modalState: modalReducer,
});