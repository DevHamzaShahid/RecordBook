import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  error: ['payload'],
  loading: ['payload'],
  startup: null,
  showAlert: ['payload'],
  newMessage: ['payload'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  error: '',
  loading: false,
  newMessage: false,
});

/* ------------- Reducers ------------- */

const loading = (state, { payload }) => state.set('loading', payload);
const error = (state, { payload }) => state.set('error', payload);
const newMessage = (state, { payload }) => state.set('newMessage', payload);

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOADING]: loading,
  [Types.ERROR]: error,
  [Types.NEW_MESSAGE]: newMessage,
});
