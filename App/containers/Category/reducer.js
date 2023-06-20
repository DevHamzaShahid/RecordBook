import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getCategories: null,
  setCategories: ['payload'],
  createCategory: ['newCat'],
  deleteCategory: ['cat'],
});

export const CategoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  categories: [],
});

// /* ------------- Reducers ------------- */

const setCategories = (state, {payload}) => state.set('categories', payload);

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CATEGORIES]: setCategories,
});

export const category = state => state.category;
