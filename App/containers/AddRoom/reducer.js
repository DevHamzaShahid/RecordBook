import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addRoomTitleDesc: ['payload'],
  removeRoomTitleDesc: ['payload'],
  resetRoomTitleDesc: null,
  setEditRoomTitleDesc: ['payload'],
  addEditRoomTitleDesc: ['payload'],
  removeEditRoomTitleDesc: ['payload'],
  addPromoCode: ['payload'],
  removePromoCode: ['payload'],
  resetPromoCode: null,
  setEditPromoCode: ['payload'],
  addEditPromoCode: ['payload'],
  removeEditPromoCode: ['payload'],
  createRoom: ['newRoom'],
  updateRoom: ['updatedRoom', 'originalImages'],
  deleteRoom: ['room'],
});

export const RoomTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  roomTitleDescs: [],
  editRoomTitleDescs: [],
  roomPromos: [],
  editRoomPromos: [],
});

// /* ------------- Reducers ------------- */

const addRoomTitleDesc = (state, { payload }) =>
  state.set('roomTitleDescs', [...state.roomTitleDescs, payload]);
const removeRoomTitleDesc = (state, { payload }) =>
  state.set(
    'roomTitleDescs',
    state.roomTitleDescs.filter(val => val.id !== payload.id),
  );
const resetRoomTitleDesc = (state, { payload }) => state.set('roomTitleDescs', []);
const setEditRoomTitleDesc = (state, { payload }) =>
  state.set('editRoomTitleDescs', payload)
const addEditRoomTitleDesc = (state, { payload }) => 
  (state.set('editRoomTitleDescs', [...state.editRoomTitleDescs, payload]))

const removeEditRoomTitleDesc = (state, { payload }) =>
  state.set(
    'editRoomTitleDescs',
    state.editRoomTitleDescs.filter(val => val.id !== payload.id)
  );
const addPromoCode = (state, { payload }) =>
  state.set('roomPromos', [...state.roomPromos, payload]);
const removePromoCode = (state, { payload }) =>
  state.set(
    'roomPromos', state.roomPromos.filter(val => val.id !== payload.id),
  );
const resetPromoCode = (state, { payload }) => state.set('roomPromos', []);
const setEditPromoCode = (state, { payload }) =>
  state.set('editRoomPromos', payload);
const addEditPromoCode = (state, { payload }) =>
  state.set('editRoomPromos', [...state.editRoomPromos, payload]);
const removeEditPromoCode = (state, { payload }) =>
  state.set(
    'editRoomPromos',
    state.editRoomPromos.filter(val => val.id !== payload.id)
  );
// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ROOM_TITLE_DESC]: addRoomTitleDesc,
  [Types.REMOVE_ROOM_TITLE_DESC]: removeRoomTitleDesc,
  [Types.RESET_ROOM_TITLE_DESC]: resetRoomTitleDesc,
  [Types.SET_EDIT_ROOM_TITLE_DESC]: setEditRoomTitleDesc,
  [Types.ADD_EDIT_ROOM_TITLE_DESC]: addEditRoomTitleDesc,
  [Types.REMOVE_EDIT_ROOM_TITLE_DESC]: removeEditRoomTitleDesc,
  [Types.ADD_PROMO_CODE]: addPromoCode,
  [Types.REMOVE_PROMO_CODE]: removePromoCode,
  [Types.RESET_PROMO_CODE]: resetPromoCode,
  [Types.SET_EDIT_PROMO_CODE]: setEditPromoCode,
  [Types.ADD_EDIT_PROMO_CODE]: addEditPromoCode,
  [Types.REMOVE_EDIT_PROMO_CODE]: removeEditPromoCode,
});

export const room = state => state.room;
