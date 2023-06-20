import { Images } from '@common';
import { MediumText } from '@Typography';
import { Container } from 'native-base';
import { Icon } from 'react-native-elements';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  SectionList,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import LargeText from '../../components/Typography/LargeText';
import XLText from '../../components/Typography/XLText';
// import { navigate } from '../../utils/rNavigation';
import Actions from './reducer';
import colors from '../../common/colors';
import functions from '@react-native-firebase/functions';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';


const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
  },
};

type SectionItemType = {
  content: string,
  icon: string,
  iconType: string,
  route: string,
};

type SectionI = {
  title: string,
  data: SectionItemType[],
  key: string,
};

const sectionListData: SectionI = [
  {
    data: [
      {
        content: 'Personal Info',
        icon: 'person-circle-outline',
        iconType: 'ionicon',
        route: 'EditProfile',
      },
      {
        content: 'Promotions',
        icon: 'megaphone-outline',
        iconType: 'ionicon',
        route: 'Promotions',
      },
    ],
    title: 'Account Settings',
    key: 'Account Settings',
  },
  {
    data: [
      {
        content: 'Frequently Asked Questions',
        icon: 'comment-question-outline',
        iconType: 'material-community',
        route: 'FAQs',
      },
      {
        content: 'Contact Us',
        icon: 'questioncircleo',
        iconType: 'antdesign',
        route: 'ContactUs',
      },
    ],
    title: 'Support',
    key: 'Support',
  },
  {
    data: [
      /* {
        content: 'Terms of Service',
        icon: 'ios-book-outline',
        iconType: 'ionicon',
        route: 'TermsAndCondition',
      },*/
      {
        content: 'Privacy Policy',
        icon: 'ios-book-outline',
        iconType: 'ionicon',
        route: 'http://recordbookstudios.com/privacy-policy',
      },
    ],
    title: 'Legal',
    key: 'Legal',
  },
];

function RenderSectionItem({ item, userApproved, }) {
  const { navigate, goBack } = useNavigation()
  return (
    <Pressable
      style={styles.sectionItemView}
      onPress={() => {
          console.log("sad", item.route);

        if (item.route === 'EditProfile' && !userApproved) {
          Alert.alert('', 'Complete Verification Photo ID Required', [
            {
              text: 'Do this later',
              style: 'destructive',
              onPress: () => navigate('EditProfile'),
            },
            {
              text: 'Verification',
              onPress: () => navigate('UploadProfileImage'),
            },
          ]);
        } else {
          item.route.includes('http://')
            ? Linking.openURL(item.route)
            : navigate(item.route);
        }
      }}>
      <Icon type={item.iconType} name={item.icon} color={'#fff'} />
      <View style={{ flex: 1 }}>
        <MediumText bold style={styles.contentText}>
          {item.content}
        </MediumText>
        {item.route === 'EditProfile' && !userApproved && (
          <View style={styles.verificationView}>
            <Icon
              type={'antdesign'}
              name={'warning'}
              color={colors.red}
              size={14}
            />
            <Text style={styles.verification}>
              Complete Verification Photo ID Required
            </Text>
          </View>
        )}
      </View>
      <Icon type={'antdesign'} name={'right'} color={'#fff'} />
    </Pressable>
  );
}

function RenderSectionHeader({ section }) {
  return (
    <View>
      <LargeText bold style={styles.titleText}>
        {section.title}
      </LargeText>
    </View>
  );
}

const Profile = ({ }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => { }, []);

  const changeImage = useCallback(() => {
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        ImagePicker.openCropper({
          path: response.uri,
          width: 400,
          height: 400,
          mediaType: 'photo',
        }).then((image) => {
          //alert(JSON.stringify(image.path));
          const source = { uri: image.path };

          dispatch(Actions.uploadProfileImage(source));

          dispatch(
            Actions.setUser({
              avatar: source.uri,
            }),
          );
        });
      }
    });
  }, []);

  return (
    <Container style={styles.container}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={{ flex: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        colors={['#092a40', '#061D2B', '#020e14', '#061D2B', '#092a40']}>
        <View style={styles.wrapper}>
          <SectionList
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            style={styles.section}
            ListHeaderComponent={
              <>
                <Pressable onPress={changeImage}>
                  <Image
                    source={user.avatar ? { uri: user.avatar } : Images.user}
                    style={styles.centerImage}
                    resizeMode={'contain'}
                  />
                </Pressable>
                <XLText bold>{user.full_name}</XLText>
              </>
            }
            sections={sectionListData}
            renderItem={({ item }) => (
              <RenderSectionItem
                item={item}
                userApproved={user.user_approved}
              />
            )}
            renderSectionHeader={RenderSectionHeader}
            ListFooterComponent={
              <Text
                style={styles.logoutText}
                onPress={() => dispatch(Actions.logout())}>
                Log Out
              </Text>
            }
          />
        </View>
      </LinearGradient>
    </Container>
  );
};

export default Profile;
