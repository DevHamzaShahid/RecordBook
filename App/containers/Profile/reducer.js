import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setUser: ['payload'],
  resetUser: ['payload'],
  verifyCode: ['code', 'user'],
  verifyEmail: ['email'],
  verifyPhone: ['user', 'navigateTo'],
  loginWithPassword: ['phone', 'password'],
  login: ['phone'],
  logout: ['payload'],
  acceptTerms: null,
  updateFcmToken: ['token'],
  updateBio: ['bio', 'navigateTo'],
  uploadProfileImage: ['image', 'navigateTo'],
  downloadProfileImage: null,
  getProfile: null,
  getAllUsers: null,
  setAllUsers: ['payload'],
  setUnApprovedUsers: ['payload'],
  setApprovedUsers: ['payload'],
  updateApprovalStatus: ['user'],
  updateNewsLetterSubscription: ['subscribe'],
  setSelectedUser: ['payload'],
  getAdmin: null,
  setAdmin: ['payload'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  auth: false,
  admin: false,
  registration_successful: false,
  uid: null,
  terms_accepted: false,
  user_approved: false,
  avatar: null,
  allUsers: [],
  unApprovedUsers: [],
  approvedUsers: [],
  selectUser: null,
  adminDetail: null,
});

// /* ------------- Reducers ------------- */

const set = (state, {payload}) => state.merge(payload);
const reset = () => INITIAL_STATE;
const setAllUsers = (state, {payload}) => state.set('allUsers', payload);
const setApprovedUsers = (state, {payload}) =>
  state.set('approvedUsers', payload);
const setUnApprovedUsers = (state, {payload}) =>
  state.set('unApprovedUsers', payload);
const setAdmin = (state, {payload}) => state.set('adminDetail', payload);
const setSelectedUser = (state, {payload}) =>
  state.set('selectedUser', payload);

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: set,
  [Types.RESET_USER]: reset,
  [Types.SET_ALL_USERS]: setAllUsers,
  [Types.SET_UN_APPROVED_USERS]: setUnApprovedUsers,
  [Types.SET_APPROVED_USERS]: setApprovedUsers,
  [Types.SET_ADMIN]: setAdmin,
  [Types.SET_SELECTED_USER]: setSelectedUser,
});

export const selectUser = (state) => state.user;
