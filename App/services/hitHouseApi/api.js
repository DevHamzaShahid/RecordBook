import {
  add,
  set,
  update,
  getDoc,
  getCollection,
  getCollectionWithFilter,
  deleteDoc,
} from '../firebaseApi';

/* ------------- Global Functions  ------------- */

const getErrorText = (error) => error || 'Error completing request';

const checkError = (res) => {
  if (res.data.error) {
    throw new Error(getErrorText(res.data.error));
  }
};

/* ------------- User and Profile Functions  ------------- */

export const addUser = async (id, data) => {
  const res = await set('Users', id, data);
  // checkError(res);
  
  return res;
};

export const updateUser = async (id, data) => {
  const res = await update('Users', id, data);
  // checkError(res);
  
  return res;
};

export const getUser = async (id) => {
  console.warn("Tut")
  const user = await getDoc('Users', id);
  console.log(user);
  // checkError(res);
  return user;
};

export const getAllUsers = async () => {
  const users = await getCollection('Users');
  // checkError(res);
  return users;
};

/* ------------- Studio Functions  ------------- */

export const getStudios = async () => {
  const studios = await getCollection('Studio');
  // checkError(res);
  return studios;
};

/* ------------- Booking Functions  ------------- */

export const updateBooking = async (data) => {
  const res = await update('Booking', data.docId, data);
  // checkError(res);
  return res;
};

export const deleteBooking = async (id) => {
  const res = await deleteDoc('Booking', id);
  return res;
};

export const getBookings = async (id) => {
  if (id) {
    const bookings = await getCollectionWithFilter(
      'Booking',
      ['userId', '==', id],
      'date',
    );
    return bookings;
  } else {
    const bookings = await getCollection('Booking', 'date');
    return bookings;
  }
};

export const getStudioBookings = async (id) => {
  const filteredBookings = await getCollectionWithFilter('Booking', [
    'studioId',
    '==',
    id,
  ]);
  return filteredBookings;
};

export const getBookingsByDate = async (date) => {
  const filteredBookings = await getCollectionWithFilter('Booking', [
    'date',
    '==',
    date,
  ]);
  return filteredBookings;
};

/* ------------- FAQ Functions  ------------- */

export const getFAQs = async () => {
  const faqs = await getCollection('FAQ');
  // checkError(res);
  return faqs;
};

export const addFAQ = async (data) => {
  const res = await add('FAQ', data);
  return res;
};

export const deleteFAQ = async (id) => {
  const res = await deleteDoc('FAQ', id);
  return res;
};

/* ------------- Category Functions  ------------- */

export const getCategories = async () => {
  const faqs = await getCollection('Category');
  // checkError(res);
  return faqs;
};

export const addCategory = async (data) => {
  const res = await add('Category', data);
  return res;
};

export const deleteCategory = async (id) => {
  const res = await deleteDoc('Category', id);
  return res;
};

/* ------------- Chat Functions  ------------- */

export const deleteChat = async (id) => {
  const res = await deleteDoc('messages', id);
  return res;
};

/* ------------- Add Room Functions  ------------- */

export const addRoom = async (data) => {
  const res = await add('Studio', data);
  return res;
};

export const updateRoom = async (data) => {
  const res = await update('Studio', data.docId, data);
  // checkError(res);
  return res;
};

export const deleteRoom = async (id) => {
  const res = await deleteDoc('Studio', id);
  return res;
};
