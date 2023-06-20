import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getStudios: null,
  setStudios: ['payload'],
  setSelectedStudio: ['payload'],
  getStudiosByDate: ['date'],
  setDatedStudios: ['payload'],
});

export const StudioTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  studios: [],
  selectedStudio: null,
  datedFullyBookedStudios: [],
});

// /* ------------- Reducers ------------- */

const setStudios = (state, {payload}) => state.set('studios', payload);
const setSelectedStudio = (state, {payload}) => state.set('selectedStudio', payload);
const setDatedStudios = (state, {payload}) => state.set('datedFullyBookedStudios', payload);

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_STUDIOS]: setStudios,
  [Types.SET_SELECTED_STUDIO]: setSelectedStudio,
  [Types.SET_DATED_STUDIOS]: setDatedStudios,
});

export const studio = state => state.studio;
