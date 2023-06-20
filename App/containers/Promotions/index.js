import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Container } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import TopNav from '../../components/TopNav';
import fonts from '../../common/Fonts';
import React, { useCallback, useState } from 'react';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import messaging from '@react-native-firebase/messaging';
import Actions from '../Profile/reducer';

const Promotions = ({ }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [subscribe, onCheckSubscribe] = useState(user.subscribed_newsletter);

  const onSubscribe = useCallback(() => {
    if (!subscribe) {
      messaging()
        .subscribeToTopic('updates_discounts')
        .then(() => console.log('Subscribed to topic!'));
    } else {
      messaging()
        .unsubscribeFromTopic('updates_discounts')
        .then(() => console.log('Unsubscribed fom the topic!'));
    }
    dispatch(
      Actions.updateNewsLetterSubscription({
        subscribed_newsletter: !subscribe,
      }),
    );
    onCheckSubscribe(!subscribe);
  }, [subscribe]);

  return (
    <Container>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={{ flex: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <TopNav showBack />

        <View style={styles.wrapper}>
          <Text style={styles.promotions}>Promotions</Text>
          <CheckBoxTitle
            style={{ paddingHorizontal: 0 }}
            checked={subscribe}
            onPress={onSubscribe}
            title="I would like to recieve texts about last minute discounted sessions!"
          />
        </View>
      </LinearGradient>
    </Container>
  );
};

const styles = StyleSheet.create({
  promotions: {
    fontFamily: fonts.type.regular,
    fontSize: fonts.size.large,
    color: '#fff',
    fontWeight: '700',
    marginVertical: 18,
    marginHorizontal: 12,
  },
  wrapper: {
    marginHorizontal: 12,
  },
});

export default Promotions;
