import {Alert} from 'react-native';

export const alert = async text => {
  Alert.alert(text, '');
};

export const confirm = async text => {
  const res = await new Promise(resolve => {
    Alert.alert(text, '', [
      {text: 'Confirm', onPress: () => resolve(true)},
      {text: 'Cancel', style: 'cancel', onPress: () => resolve(false)},
    ]);
  });

  return res;
};
