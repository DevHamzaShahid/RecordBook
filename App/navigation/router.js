import React, {useCallback, useEffect} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {isMountedRef, navigationRef} from '../utils/rNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect, useSelector} from 'react-redux';
import { CardStyleInterpolators } from '@react-navigation/stack';
// Auth Flow
import Splash from '../containers/Splash';
import TOS from '../containers/TOS';
import Berbix from '../containers/Berbix';
import PhoneLogin from '../containers/PhoneLogin';
import EmailVerification from '../containers/EmailVerification';
import Bio from '../containers/Bio';
import UploadProfileImage from '../containers/UploadProfileImage';
import RegistrationSuccess from '../containers/RegistrationSuccess';
import PhoneVerification from '../containers/PhoneVerification';
import PhoneVerified from '../containers/PhoneVerified';
import TermsAndCondition from '../containers/TermsAndCondition';
import NewsLetter from '../containers/NewsLetter';

// Main Tab
//Studio
import Studio from '../containers/Studio';
import StudioDetail from '../containers/StudioDetail';
import SelectBookingDateTime from '../containers/SelectBookingDateTime';
import ApplyCoupon from '../containers/ApplyCoupon';
import PaymentSuccessful from '../containers/PaymentSuccessful';
import RentalAgreement from '../containers/RentalAgreement';

//My booking
import MyBooking from '../containers/MyBooking';
import Reschedule from '../containers/Reschedule';
import BookingDetail from '../containers/BookingDetail';
import Receipt from '../containers/Receipt';

//Support
import Support from '../containers/Support';
import FaqDetail from '../containers/FaqDetail';

//Profile
import Profile from '../containers/Profile';
import EditProfile from '../containers/EditProfile';
import FAQs from '../containers/FAQs'
// Admin Main Tab
// My Room
import MyRoom from '../containers/MyRoom';
import RoomDetail from '../containers/RoomDetail';
import ManualBooking from '../containers/ManualBooking';
import AddRoom from '../containers/AddRoom';
import AddRoomTitleDesc from '../containers/AddRoomTitleDesc';
import AddPromoCode from '../containers/AddPromoCode';

//Manage Booking
import ManageBooking from '../containers/ManageBooking';


// Helpdesk
import HelpDesk from '../containers/HelpDesk';
import Chat from '../containers/Chat';
import Category from '../containers/Category';
import MyArticles from '../containers/MyArticles';

// User
import ManageUser from '../containers/ManageUser';
import UserDetails from '../containers/UserDetails';
import SendNotification from '../containers/SendNotification';

import {Colors, Images} from '@common';
import SignUp from '../containers/SignUp';
import Promotions from '../containers/Promotions';
import AgreementSignature from '../containers/AgreementSignature';
import ConfirmPay from '../containers/ConfirmPay';
import ContactUs from '../containers/ContactUs';
import Testing from '../containers/Testing';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const header = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: Colors.black,
      shadowOffset: {height: 0, width: 0},
    },
    headerTintColor: Colors.white,
  };
};

const headerRed = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: Colors.red,
      shadowOffset: {height: 0, width: 0},
    },
    headerTintColor: Colors.white,
  };
};

const createMainStack = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="Berbix" component={Berbix} />

    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
    <Stack.Screen name="TOS" component={TOS} />
    <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
    <Stack.Screen name="PhoneVerified" component={PhoneVerified} />
    <Stack.Screen name="EmailVerification" component={EmailVerification} />
    <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
    <Stack.Screen name="Bio" component={Bio} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="UploadProfileImage" component={UploadProfileImage} />
    <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccess} />
    <Stack.Screen name="HomeTab" children={Main} />
    <Stack.Screen name="AdminHomeTab" children={createAdminMainTab} />
  </Stack.Navigator>
);

const Main = () => {
  return (
    <Stack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
        // cardStyle: { backgroundColor: 'transparent' },
        // cardOverlayEnabled: true,
        // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <Stack.Screen name="HomeTab" children={createMainTab} />

      <Stack.Screen name="StudioDetail" component={StudioDetail} />
      <Stack.Screen name="ConfirmBooking" component={confirmBookingStack} />

      <Stack.Screen name="ApplyCoupon" component={ApplyCoupon} />
      <Stack.Screen name="RentalAgreement" component={RentalAgreement} />
      <Stack.Screen name="PaymentSuccessful" component={PaymentSuccessful} />
    </Stack.Navigator>
  );
};

const confirmBookingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChooseDateTime" component={SelectBookingDateTime} />
      <Stack.Screen name="AgreementSignature" component={AgreementSignature} />
      <Stack.Screen name="ConfirmPay" component={ConfirmPay} />
    </Stack.Navigator>
  );
};

const myBookingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="My Booking" component={MyBooking} />

    <Stack.Screen name="StudioDetail" component={StudioDetail} />

    <Stack.Screen
      name="BookingDetail"
      component={BookingDetail}
      options={header('')}
      initialParams={{adminMode: false}}
    />
    <Stack.Screen name="Receipt" component={Receipt} options={header('')} />
    <Stack.Screen
      name="Reschedule"
      component={Reschedule}
      options={header('')}
    />
  </Stack.Navigator>
);

const profileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="Promotions" component={Promotions} />
    <Stack.Screen name="ContactUs" component={ContactUs} />
    <Stack.Screen name="FAQs" component={FAQs} />
  </Stack.Navigator>
);

function Badge({newMessage, icon, focused}) {
  return (
    <View>
      <Image source={icon} style={styles.icon} />
      {!focused && newMessage && <View style={styles.badge} />}
    </View>
  );
}

const BadgeContainer = connect((state, ownProps) => ({
  newMessage: state.app.newMessage,
  icon: ownProps.icon,
  focused: ownProps.focused,
}))(Badge);

const createMainTab = () => {
  const {auth} = useSelector((state) => state.user);

  const onPress = useCallback(
    (navigation, props) => {
      if (auth) {
        props.onPress();
      } else {
        Alert.alert('', 'You need to be logged in to have access to this tab', [
          {style: 'cancel', text: 'Cancel'},
          {
            text: 'Sign In or Create Account',
            onPress: () => navigation.navigate('PhoneLogin'),
          },
        ]);
      }
    },
    [auth],
  );
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            onPress={() => onPress(navigation, props)}
          />
        ),
        tabBarIcon: ({focused}) => {
          let icon;
          switch (route.name) {
            case 'Studio': {
              icon = focused
                ? Images.search_tab_ic
                : Images.search_tab_inactive_ic;
              break;
            }
            case 'My Bookings': {
              icon = focused
                ? Images.calendar_tab_ic
                : Images.calendar_tab_inactive_ic;
              break;
            }
            case 'Profile': {
              icon = focused
                ? Images.profile_tab_ic
                : Images.profile_tab_inactive_ic;
            }
          }
          // You can return any component that you like here!
          return <Image source={icon} style={styles.icon} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        iconStyle: styles.icon,
        style: {
          borderTopColor: '#111c24',
          backgroundColor: '#111c24',
        },
      }}>
      <Stack.Screen name="Studio" component={Studio} />
      <Tab.Screen name="My Bookings" component={myBookingsStack} />
      <Tab.Screen name="Profile" component={profileStack} />
    </Tab.Navigator>
  );
};

//////////////////////////////////////////////////////ADMIN////////////////////////////////////////////////////////////////

const MyRoomStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="MyRoom"
      component={MyRoom}
      options={{headerLeft: null, ...header('')}}
    />
    <Stack.Screen
      name="RoomDetail"
      component={RoomDetail}
      options={header('')}
    />
     <Stack.Screen
      name="Testing"
      component={Testing}
      // options={{headerLeft: null, ...header('')}}
    />
    <Stack.Screen
      name="EditRoom"
      component={AddRoom}
      options={header('')}
      initialParams={{editMode: true}}
    />
    <Stack.Screen
      name="EditRoomTitleDesc"
      component={AddRoomTitleDesc}
      options={header('')}
      initialParams={{editMode: true}}
    />
    <Stack.Screen
      name="EditPromoCode"
      component={AddPromoCode}
      options={header('')}
      initialParams={{editMode: true}}
    />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={header('')}
    />
    <Stack.Screen
      name="ManualDateTime"
      component={SelectBookingDateTime}
      options={header('')}
    />
    <Stack.Screen
      name="ManualBooking"
      component={ManualBooking}
      options={header('')}
    />
    <Stack.Screen
      name="ManualBookingSuccessful"
      component={PaymentSuccessful}
      options={header('')}
    />
    <Stack.Screen
      name="AddRoom"
      component={AddRoom}
      options={header('')}
      initialParams={{editMode: false}}
    />
    <Stack.Screen
      name="AddRoomTitleDesc"
      component={AddRoomTitleDesc}
      options={header('')}
      initialParams={{editMode: false}}
    />
    <Stack.Screen
      name="AddPromoCode"
      component={AddPromoCode}
      options={header('')}
      initialParams={{editMode: false}}
    />
  </Stack.Navigator>
);

const userRoomStack = () => (
  <Stack.Navigator screenOptions={{}}>
    <Stack.Screen
      name="Manage User"
      component={ManageUser}
      options={{headerLeft: null, ...header('')}}
    />
    <Stack.Screen
      name="UserDetails"
      component={UserDetails}
      options={header('')}
    />
    <Stack.Screen
      name="SendNotification"
      component={SendNotification}
      options={header('')}
    />
  </Stack.Navigator>
);

const helpDeskStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}>
    <Stack.Screen
      name="HelpDesk"
      component={HelpDesk}
      options={{headerLeft: null, ...header('')}}
    />
    <Stack.Screen name="Chat" component={Chat} options={header('')} />
    <Stack.Screen name="FAQ" component={FAQs} options={header('')} />
    <Stack.Screen name="FAQDetail" component={FaqDetail} options={header('')} />
    <Stack.Screen
      name="MyArticles"
      component={MyArticles}
      options={header('')}
    />
    <Stack.Screen name="Category" component={Category} options={header('')} />
    <Stack.Screen
      name="NewsLetter"
      component={NewsLetter}
      options={header('')}
    />
  </Stack.Navigator>
);

const manageBookingsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
    }}>
    <Stack.Screen
      name="Manage Booking"
      component={ManageBooking}
      options={{headerLeft: null, ...header('')}}
    />
    <Stack.Screen
      name="ManageBookingDetail"
      component={BookingDetail}
      options={header('')}
      initialParams={{adminMode: true}}
    />
    <Stack.Screen
      name="Reschedule"
      component={Reschedule}
      options={header('')}
    />
  </Stack.Navigator>
);

const createAdminMainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon;
          switch (route.name) {
            case 'My Rooms':
              icon = focused ? Images.dubbing_red : Images.dubbing;
              break;
            case 'Manage Bookings':
              icon = focused ? Images.calendar_red : Images.calendar;
              break;
            case 'Support':
              icon = focused ? Images.support_red : Images.support;
              return <BadgeContainer icon={icon} focused={focused} />;
            case 'Users':
              icon = focused ? Images.user_red : Images.profile;
          }
          // You can return any component that you like here!
          return <Image source={icon} style={styles.icon} />;
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: Colors.red,
        inactiveTintColor: Colors.white,
        style: {
          backgroundColor: Colors.tabBarColor,
        },
      }}>

      <Tab.Screen name="My Rooms" component={MyRoomStack} />
      <Tab.Screen name="Manage Bookings" component={manageBookingsStack} />
      {/* <Tab.Screen name="Support" component={helpDeskStack} /> */}
      <Tab.Screen name="Users" component={userRoomStack} />
    </Tab.Navigator>
  );
};

export default () => {
  isMountedRef.current = true;
  useEffect(() => {
    return () => (isMountedRef.current = false);
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef}
      // onReady={() => {
      //   isMountedRef.current = true;
      // }}
    >
      {createMainStack()}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -10,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  icon: {
    width: 28,
    height: 28,
    marginVertical: 8,
  },
});
