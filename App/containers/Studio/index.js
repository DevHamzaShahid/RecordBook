import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'native-base';
import Actions from './reducer';
import styles from './styles';
import TopNav from '../../components/TopNav';
import All from './All';
import Filter from './Filter';
import {
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabView,
} from 'react-native-tab-view';
import { Image } from 'react-native';
import Today from './Today';
import Tomorrow from './Tomorrow';
import Constants from '../../common/Constant';
import colors from '../../common/colors';
import MediumText from '../../components/Typography/MediumText';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Colors } from '../../common';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const RenderScene = SceneMap({
  all: All,
  today: Today,
  tomorrow: Tomorrow,
  filter: Filter,
});

const routes = [
  { key: 'all', title: 'View All' },
  // { key: 'today', title: 'Today' },
  // { key: 'tomorrow', title: 'Tomorrow' },
  { key: 'filter', title: 'Filter' },
];

const RenderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle}
    style={styles.taBar}
    activeColor={colors.skyBlue01}
    inactiveColor={colors.white}
    renderLabel={({ route, focused, color }) =>
      route.title == 'Filter' ? (
        <Image
          style={{ height: 20, width: 20 }}
          resizeMode="contain"
          source={require('../../../assets/calendar.png')}></Image>
      ) : (
        <MediumText textStyle={[styles.labelTab, { color }]}>
          {route.title}
        </MediumText>
      )
    }
    renderIndicator={(props) => (
      <TabBarIndicator
        {...props}
        style={{ backgroundColor: colors.skyBlue01, height: 3 }}
      />
    )}
  />
);

const Studio = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(Actions.getStudios());
  }, []);
  //can remove this code was only for testing purpose
  // useEffect(() => {
  //   (async () => {
  //     const res = await firestore()
  //       .collection('Users')
  //       .where('email', '==', 'Hamzashahid@kk.com')
  //       .get();
  //     res.docs.forEach((e) => {
  //       const a = e.id
  //       console.log("valll", a);
  //     })
  //   })()

  // }, []);
 
  return (
    <Container style={styles.container}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={{ flex: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <View style={styles.wrapper}>
          <TopNav showLogo />
        </View>
        <TabView
          swipeEnabled={false}
          navigationState={{ index, routes }}
          renderScene={RenderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Constants.screenWidth }}
          renderTabBar={RenderTabBar}
        />
      </LinearGradient>
    </Container>
  );
};

export default Studio;
