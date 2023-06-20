import functions from '@react-native-firebase/functions';
import {Container, Tab, Tabs} from 'native-base';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors} from '@common';
import {useDispatch, useSelector} from 'react-redux';
import SectionHeader from '../../components/SectionHeader';
import SwipeUserButton from '../../components/SwipeUserButton';
import UserItem from '../../components/UserItem';
import ProfileActions from '../Profile/reducer';
import styles from './styles';

const ManageUser = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(ProfileActions.getAllUsers());
  }, []);

  const keyExtractor = (k) => `${k.docId}`;

  const renderUserHiddenItem = (data, rowMap) => (
    <SwipeUserButton
      key={`${data.index}`}
      showIcon
      onPressCancel={() => {
        dispatch(
          ProfileActions.updateApprovalStatus({
            docId: data.item.docId,
            user_approved: false,
          }),
        );
        rowMap[data.item.key].closeRow();
      }}
      onPressApprove={() => {
        dispatch(
          ProfileActions.updateApprovalStatus({
            docId: data.item.docId,
            user_approved: true,
          }),
        );
        rowMap[data.item.key].closeRow();
        functions().httpsCallable('sendEmail')({
          to: data.item.email,
          message: {
            subject: 'RecordBook - Time to book a studio.',
            text:
              "Thank you for registering on the RecordBook app. Your registration has been approved and you can now book a studio at anytime! We can't wait to see what you will create.\n\nQuestions? Concerns? Please contact the RecordBook support team through the app at anytime.\n\n\nThank you.\n-The RecordBook Team",
          },
        });
      }}
    />
  );
  const showUserDetail = (user) => {
    dispatch(ProfileActions.setSelectedUser(user));
    navigation.navigate('UserDetails');
  };

  const renderUserItem = ({item}) => (
    <UserItem item={item} onPress={() => showUserDetail(item)} />
  );

  return (
    <Container style={styles.container}>
      <Tabs locked tabBarUnderlineStyle={{backgroundColor: Colors.red}}>
        <Tab
          heading="Unapproved"
          tabStyle={{backgroundColor: Colors.black}}
          activeTabStyle={{backgroundColor: Colors.black}}
          textStyle={{color: Colors.white}}
          style={{backgroundColor: 'transparent'}}
          activeTextStyle={{color: Colors.red}}>
          <SwipeListView
            data={user.unApprovedUsers}
            keyExtractor={keyExtractor}
            renderItem={renderUserItem}
            renderHiddenItem={renderUserHiddenItem}
            rightOpenValue={-75}
            leftOpenValue={75}
          />
        </Tab>
        <Tab
          heading="Approved"
          tabStyle={{backgroundColor: Colors.black}}
          activeTabStyle={{backgroundColor: Colors.black}}
          textStyle={{color: Colors.white}}
          style={{backgroundColor: 'transparent'}}
          activeTextStyle={{color: Colors.red}}>
          <SwipeListView
            data={user.approvedUsers}
            keyExtractor={keyExtractor}
            renderItem={renderUserItem}
            // renderHiddenItem={renderUserHiddenItem}
            // rightOpenValue={-75}
            // leftOpenValue={75}
          />
        </Tab>
      </Tabs>

      {/* {user.unApprovedUsers.length > 0 && (
        <View style={styles.listContainer}>
          <SectionHeader title="Pending Approvals" />
          <SwipeListView
            data={user.unApprovedUsers}
            keyExtractor={keyExtractor}
            renderItem={renderUserItem}
            renderHiddenItem={renderUserHiddenItem}
            rightOpenValue={-75}
            leftOpenValue={75}
          />
        </View>
      )} */}
      {/* {user.approvedUsers.length > 0 && (
        <View style={styles.listContainer}>
          <SectionHeader title="Approved Users" />
          <SwipeListView
            data={user.approvedUsers}
            keyExtractor={keyExtractor}
            renderItem={renderUserItem}
            // renderHiddenItem={renderUserHiddenItem}
            // rightOpenValue={-75}
            // leftOpenValue={75}
          />
        </View>
      )} */}
    </Container>
  );
};

export default ManageUser;
