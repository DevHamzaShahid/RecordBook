import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getFAQS: null,
  setFAQS: ['payload'],
  setSelectedFaq: ['payload'],
});

export const FaqTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  faqs: [],
  selectedFaq: null,
});

// /* ------------- Reducers ------------- */

const setFAQS = (state, {payload}) => state.set('faqs', payload);
const setSelectedFaq = (state, {payload}) => state.set('selectedFaq', payload);

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FAQS]: setFAQS,
  [Types.SET_SELECTED_FAQ]: setSelectedFaq,
});

export const studio = state => state.faq;
