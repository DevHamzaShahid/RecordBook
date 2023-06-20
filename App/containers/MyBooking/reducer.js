import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getBookings: ['navigateTo'],
  setBookings: ['payload'],
  setMyBookings: ['payload'],
  setSelectedBooking: ['payload'],
  setNewBookings: ['payload'],
  updateBooking: ['booking', 'isAdmin'],
  deleteBooking: ['booking', 'goBack', 'isAdmin'],
  getStudioBookings: ['studioId'],
  setStudioBookings: ['payload'],
  getBookingsForAdmin: null,
  setBookingDeleted: ['payload'],
  setTermsAccepted: ['payload'],
});

export const BookingTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  bookings: [],
  myBookings: [],
  selectedBooking: null,
  newBookings: [],
  studioBookings: [],
  bookingDeleted: false,
  termsAccepted: false,
});

// /* ------------- Reducers ------------- */

const setBookings = (state, {payload}) => state.set('bookings', payload);
const setMyBookings = (state, {payload}) => state.set('myBookings', payload);
const setNewBookings = (state, {payload}) => state.set('newBookings', payload);
const setSelectedBooking = (state, {payload}) =>
  state.set('selectedBooking', payload);
const setStudioBookings = (state, {payload}) =>
  state.set('studioBookings', payload);
const setBookingDeleted = (state, {payload}) =>
  state.set('bookingDeleted', payload);
const setTermsAccepted = (state, {payload}) => state.set('termsAccepted', payload);


// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_BOOKINGS]: setBookings,
  [Types.SET_MY_BOOKINGS]: setMyBookings,
  [Types.SET_SELECTED_BOOKING]: setSelectedBooking,
  [Types.SET_NEW_BOOKINGS]: setNewBookings,
  [Types.SET_STUDIO_BOOKINGS]: setStudioBookings,
  [Types.SET_BOOKING_DELETED]: setBookingDeleted,
  [Types.SET_TERMS_ACCEPTED]: setTermsAccepted,
});

export const booking = state => state.booking;
