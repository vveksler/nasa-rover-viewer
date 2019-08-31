import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addKey } from './actions';

const apiKey = handleActions(
  {
    [addKey]: (_state, action) => action.payload
  },
  null
);

export const getApiKey = state => state.auth.apiKey;
export const getIsAuthorized = state => !!getApiKey(state);

export default combineReducers({
  apiKey
});

// Реализуйте редьюсер
