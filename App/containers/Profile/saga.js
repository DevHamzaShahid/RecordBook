import {call, put, select, takeLatest} from 'redux-saga/effects';
import Actions, {selectUser, UserTypes} from './reducer';
import AppActions from '../Root/reducer';
import {navigate, popToTop} from '../../utils/rNavigation';
import {
  checkPhoneExiting,
  phoneLogin,
  sendEmailVerification,
  signOut,
} from '../../utils/auth';
import firestore from '@react-native-firebase/firestore';
import {
  downloadImageFromFirebaseStorage,
  saveImageToFirebaseStorage,
} from '../../utils/storage';
import hitHouseApi from '../../services/hitHouseApi';
import {Alert} from 'react-native';

let confirmationResult = null;

function* login(payload) {
  try {
    yield put(AppActions.loading(true));
    const res = yield phoneLogin(payload.phone);
    if (res) {
      confirmationResult = res;
    }
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* loginWithPassword(payload) {
  try {
    yield put(AppActions.loading(true));
    const res = yield checkPhoneExiting(payload.phone);

    console.log('res', res);
    if (!res) {
      Alert.alert('', 'Unregistered phone number');
    } else if (res.password) {
      if (res.password === payload.password) {
        yield put(
          Actions.setUser({
            ...res,
            uid: res.uid,
            auth: true,
          }),
        );
        yield call(popToTop, null);
        yield call(navigate, res.admin ? 'AdminHomeTab' : 'HomeTab');
      } else {
        Alert.alert('', 'Incorrect password');
      }
    } else {
      Alert.alert(
        '',
        'Your account does not support login with a password. Please use OTP to login',
      );
    }

    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.error(e));
  }
}
function* loginWithOTP(payload) {
  try {
    yield put(AppActions.loading(true));
    const res = yield checkPhoneExiting(payload.phone);
    console.log('res', res);
    if (!res) {
      Alert.alert('', 'Unregistered phone number');
    } else if (res.password) {
      if (res.password === payload.password) {
        yield put(
          Actions.setUser({
            ...res,
            uid: res.uid,
            auth: true,
          }),
        );
        yield call(popToTop, null);
        yield call(navigate, res.admin ? 'AdminHomeTab' : 'HomeTab');
      } else {
        Alert.alert('', 'Incorrect password');
      }
    } else {
      Alert.alert(
        '',
        'Your account does not support login with a password. Please use OTP to login',
      );
    }

    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* logout() {
  try {
    yield put(Actions.resetUser());
    yield signOut();
    yield call(popToTop, null);
    yield call(navigate, 'HomeTab');
  } catch (e) {
    yield put(AppActions.error(''));
  }
}

function* verifyCode(payload) {
  try {
    yield put(AppActions.loading(true));
    const res = yield confirmationResult.confirm(payload.code);
    if (res) {
      const user = yield call(hitHouseApi.getUser, res.uid);
      if (user._data) {
        // LOGIN
        yield put(
          Actions.setUser({
            ...user._data,
            uid: res.uid,
            auth: true,
          }),
        );
        yield put(AppActions.startup());
      } else {
        // SIGNUP
        yield call(hitHouseApi.addUser, res.uid, {
          admin: false,
          registration_successful: true,
          phone: payload.user.phone,
          terms_accepted: true,
          ...payload.user,
        });
        yield put(
          Actions.setUser({
            auth: true,
            admin: false,
            registration_successful: true,
            uid: res.uid,
            terms_accepted: true,
            ...payload.user,
          }),
        );
        yield call(navigate, 'UploadProfileImage');
      }
    }
    yield put(AppActions.loading(false));
  } catch (err) {
    // yield put(AppActions.error(e));
    console.log(err);
    yield put(AppActions.error('Please enter valid code'));
  }
}

function* verifyEmail(payload) {
  try {
    yield sendEmailVerification(payload.email);
    // yield updateBio({email: payload.email});
  } catch (e) {
    yield logout();
    yield put(AppActions.error(e));
  }
}

function* verifyPhone(payload) {
  try {
    const isExitPhone = yield checkPhoneExiting(payload.user.phone);
    yield put(AppActions.loading(false));
    if (isExitPhone && !payload.user.otpSigIn) {
      Alert.alert('Error', 'Phone number already in use');
    } else {
      yield call(navigate, payload.navigateTo, payload.user);
    }
  } catch (e) {
    yield put(AppActions.error('Phone number already in use'));
  }
}

function* updateFcmToken(payload) {
  try {
    yield put(AppActions.loading(true));
    const {uid} = yield select(selectUser);
    yield call(hitHouseApi.updateUser, uid, {
      fcmToken: firestore.FieldValue.arrayUnion(payload.token),
    });
    yield put(
      Actions.setUser({
        fcmToken: payload.token,
        ...selectUser,
      }),
    );
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* acceptTerms() {
  try {
    yield put(AppActions.loading(true));
    const {uid, phone} = yield select(selectUser);

    yield call(hitHouseApi.updateUser, uid, {
      terms_accepted: true,
      user_approved: false,
    });
    yield put(
      Actions.setUser({
        terms_accepted: true,
        user_approved: false,
        ...selectUser,
      }),
    );

    yield call(navigate, 'PhoneVerified');
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* updateBio(payload) {
  try {
    yield put(AppActions.loading(true));
    const {uid} = yield select(selectUser);
    yield getAdmin();
    yield call(hitHouseApi.updateUser, uid, payload.bio);

    yield put(
      Actions.setUser({
        ...payload.bio,
        ...selectUser,
      }),
    );
    if (payload.navigateTo) {
      yield call(navigate, payload.navigateTo);
    }
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* updateApprovalStatus(payload) {
  try {
    yield put(AppActions.loading(true));
    yield call(hitHouseApi.updateUser, payload.user.docId, payload.user);
    yield getAllUsers();
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* updateNewsLetterSubscription(payload) {
  try {
    yield put(AppActions.loading(true));
    const {uid} = yield select(selectUser);
    yield call(hitHouseApi.updateUser, uid, payload.subscribe);
    yield put(
      Actions.setUser({
        ...payload.subscribe,
        ...selectUser,
      }),
    );
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* uploadProfileImage(payload) {
  try {
    const {uid} = yield select(selectUser);

    if (payload.image) {
      yield saveImageToFirebaseStorage(
        `profile/${uid}.jpeg`,
        payload.image.uri,
      );
    }

    //const user = yield call(hitHouseApi.getUser, uid);
    //console.log(JSON.stringify(user));

    const imageUrl = yield downloadImageFromFirebaseStorage(
      `profile/${uid}.jpeg`,
    );

    yield put(
      Actions.setUser({
        avatar: `${imageUrl}`,
        registration_successful: true,
        ...selectUser,
      }),
    );

    yield call(hitHouseApi.updateUser, uid, {
      avatar: `${imageUrl}+.jpeg`,
      registration_successful: true,
    });

    if (payload.navigateTo) {
      yield call(navigate, payload.navigateTo);
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* downloadProfileImage() {
  try {
    const {uid} = yield select(selectUser);
    const imageUrl = yield downloadImageFromFirebaseStorage(
      `profile/${uid}.jpeg`,
    );
    yield put(
      Actions.setUser({
        avatar: `${imageUrl}`,
        ...selectUser,
      }),
    );
    //return imageUrl;
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* getProfile() {
  try {
    yield put(AppActions.loading(true));
    const {uid} = yield select(selectUser);
    const user = yield call(hitHouseApi.getUser, uid);
    yield put(
      Actions.setUser({
        ...user._data,
        ...selectUser,
      }),
    );
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* getAllUsers() {
  try {
    yield put(AppActions.loading(true));
    const users = yield call(hitHouseApi.getAllUsers);
    if (users) {
      yield put(Actions.setAllUsers(users));
      let unApprovedUser = users.filter((aUser) => !aUser.user_approved);
      let approvedUser = users.filter((aUser) => aUser.user_approved);
      yield put(Actions.setUnApprovedUsers(unApprovedUser));
      yield put(Actions.setApprovedUsers(approvedUser));
    }
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

function* getAdmin() {
  try {
    yield put(AppActions.loading(true));
    const users = yield call(hitHouseApi.getAllUsers);
    if (users) {
      let aAdmin = users.filter((aUser) => aUser.admin)[0];
      yield put(Actions.setAdmin(aAdmin));
    }
    yield put(AppActions.loading(false));
  } catch (e) {
    yield put(AppActions.loading(false));
    yield put(AppActions.error(e));
  }
}

export default [
  takeLatest(UserTypes.LOGOUT, logout),
  takeLatest(UserTypes.LOGIN, login),
  takeLatest(UserTypes.LOGIN_WITH_PASSWORD, loginWithPassword),
  takeLatest(UserTypes.VERIFY_CODE, verifyCode),
  takeLatest(UserTypes.VERIFY_EMAIL, verifyEmail),
  takeLatest(UserTypes.VERIFY_PHONE, verifyPhone),
  takeLatest(UserTypes.ACCEPT_TERMS, acceptTerms),
  takeLatest(UserTypes.UPDATE_BIO, updateBio),
  takeLatest(UserTypes.UPDATE_FCM_TOKEN, updateFcmToken),
  takeLatest(UserTypes.UPDATE_APPROVAL_STATUS, updateApprovalStatus),
  takeLatest(UserTypes.UPLOAD_PROFILE_IMAGE, uploadProfileImage),
  takeLatest(UserTypes.DOWNLOAD_PROFILE_IMAGE, downloadProfileImage),
  takeLatest(UserTypes.GET_ALL_USERS, getAllUsers),
  takeLatest(UserTypes.GET_PROFILE, getProfile),
  takeLatest(UserTypes.GET_ADMIN, getAdmin),
  takeLatest(
    UserTypes.UPDATE_NEWS_LETTER_SUBSCRIPTION,
    updateNewsLetterSubscription,
  ),
];
