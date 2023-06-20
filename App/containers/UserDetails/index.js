import {SolidButton} from '@Buttons';
import functions from '@react-native-firebase/functions';
import {RegularText, SmallText} from '@Typography';
import {Body, Container, Content, Left, ListItem} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ListHeader from '../../components/ListHeader';
import SectionHeader from '../../components/SectionHeader';
import {getDownloadURL} from '../../utils/storage';
import ProfileActions from '../Profile/reducer';
import styles from './styles';
import {Icon} from 'react-native-elements';
import {useUserVerificationDetails} from '../../common/hooks';

const UserDetails = ({navigation}) => {
  const user = useSelector((state) => state.user.selectedUser);
  const {loading, status} = useUserVerificationDetails(
    user?.userBerbixRefreshToken || '',
  );
  const [banner, setBanner] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserImage();
  }, []);

  const getUserImage = async () => {
    if (user.avatar) {
      await getDownloadURL(`profile/${user.avatar}`)
        .then((downloadURL) => {
          setBanner({uri: downloadURL});
        })
        .catch((error) => {
          setBanner(null);
        });
    }
  };

  const goToSendNotification = () => {
    navigation.navigate('SendNotification', {user});
  };

  return (
    <Container style={styles.container}>
      <SectionHeader
        title={user.full_name}
        icon1
        icon1Name="send"
        onPressIcon1={() => goToSendNotification()}
      />
      <Content padder>
        <View style={styles.imageContainer}>
          {banner && <Image source={banner} style={styles.centerImage} />}
        </View>
        <ListHeader title="Account Details" />
        <ListItem>
          <Left>
            <SmallText bold>Email</SmallText>
          </Left>
          <Body>
            <SmallText>{user.email}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>Username</SmallText>
          </Left>
          <Body>
            <SmallText>{user.user_name}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>First name</SmallText>
          </Left>
          <Body>
            <SmallText>{user.first_name}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>Last name</SmallText>
          </Left>
          <Body>
            <SmallText>{user.last_name}</SmallText>
          </Body>
        </ListItem>

        <ListItem>
          <Left>
            <SmallText bold>Verification Status</SmallText>
          </Left>
          <Body>
            <SmallText>{loading ? 'Loading...' : status}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>Address</SmallText>
          </Left>
          <Body>
            <SmallText>{user.address}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>City</SmallText>
          </Left>
          <Body>
            <SmallText>{user.city}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>Zip</SmallText>
          </Left>
          <Body>
            <SmallText>{user.zip}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>Instagram user</SmallText>
          </Left>
          <Body>
            <SmallText>{user.insta}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>Tik tok</SmallText>
          </Left>
          <Body>
            <SmallText>{user.tikTok}</SmallText>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <SmallText bold>Spotify</SmallText>
          </Left>
          <Body>
            <SmallText>{user.spotify}</SmallText>
          </Body>
        </ListItem>
        {!user.user_approved && (
          <View style={styles.btnContainer}>
            <SolidButton
              title="Approve"
              buttonStyle={styles.acceptButtonStyle}
              onPress={() => {
                dispatch(
                  ProfileActions.updateApprovalStatus({
                    docId: user.docId,
                    user_approved: true,
                  }),
                );
                functions().httpsCallable('sendEmail')({
                  to: user.email,
                  message: {
                    subject: 'RecordBook - Time to book a studio.',
                    text: "Thank you for registering on the RecordBook app. Your registration has been approved and you can now book a studio at anytime! We can't wait to see what you will create.\n\nQuestions? Concerns? Please contact the RecordBook support team through the app at anytime.\n\n\nThank you.\n-The RecordBook Team",
                  },
                });
                navigation.goBack();
              }}
            />
            <SolidButton
              title="Cancel"
              buttonStyle={styles.declineButtonStyle}
              onPress={() => {
                dispatch(
                  ProfileActions.updateApprovalStatus({
                    docId: user.docId,
                    user_approved: false,
                  }),
                );
                navigation.goBack();
              }}
            />
          </View>
        )}
      </Content>
    </Container>
  );
};

export default UserDetails;
