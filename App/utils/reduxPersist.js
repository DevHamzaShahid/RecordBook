import AsyncStorage from '@react-native-community/async-storage';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['user'],
    stateReconciler: seamlessImmutableReconciler,
    transforms: [
      seamlessImmutableTransformCreator({
        whitelistPerReducer: {
          // user: ['auth', 'auth_token', 'isGuest'],
        },
      }),
    ],
  },
};

export default REDUX_PERSIST;
