import { combineReducers } from 'redux';
import { modalReducer } from './modalReducer';
import { uiReducer } from './uiReducer';

// Método combineReducers
// Combina os reducers de vários arquivos que eu tiver criado

export default combineReducers({
  modalState: modalReducer,
  uiState: uiReducer,
});