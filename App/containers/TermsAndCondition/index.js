import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, View, Alert, Text, Linking} from 'react-native';
import {Container, Content} from 'native-base';
import Actions from '../Profile/reducer';
import {SolidButton} from '@Buttons';
import {LargeText, RegularText} from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import CheckBoxTitle from '../../components/CheckBoxTitle';

import styles from './styles';
const TermsAndCondition = ({navigation}) => {
  const dispatch = useDispatch();
  const [termAccept, setTermsAccepted] = useState(false);

  const decline = () => {
    Alert.alert('You need to accept Terms of service');
  };

  const accept = () => {
    dispatch(Actions.acceptTerms());
  };

  useEffect(() => {});
  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.container}>
        <SectionHeader title="Terms of Service" />
        <Content padder>
          <LargeText bold>Studio Rental Agreement: {`\n`}</LargeText>
          <RegularText>
            By signing this rental agreement, Renter(s) agree to the following:
          </RegularText>
          <LargeText bold>
            {`\n\n`}RATES:{`\n`}
          </LargeText>
          <RegularText>
            The price listed per room is for a 12-hour time slot. The only time
            slots we offer are from 8:00am - 8:00pm or 8:00pm - 8:00am everyday.
            This includes the last 30 minutes of each session to be dedicated to
            saving your files and allowing our staff to clean and prepare the
            studio for the following session. A full payment of the rate listed
            is required at the time of booking to confirm reservation.
          </RegularText>
          <LargeText bold>
            {`\n\n`}CANCELLATION POLICY{`\n`}
          </LargeText>
          <RegularText>
            There are no cancellations or rescheduling within 48 hours of your
            bookings start time.
          </RegularText>
          <LargeText bold>
            {`\n\n`}SMOKING{`\n`}
          </LargeText>
          <RegularText>
            There is absolutely NO SMOKING OF TOBACCO permitted inside the
            buildings. Smoking tobacco is permitted outside the buildings.
            Renter is responsible for the clean up of any smoking-related debris
            (ashes, cigarettes, etc) before leaving.
          </RegularText>
          <LargeText bold>
            {`\n\n`}CLEANING:{`\n`}
          </LargeText>
          <RegularText>
            Our staff will arrive 30 minutes prior to the end of each session
            (7:30am or 7:30pm) to prepare for the following client. At that
            time, we request for our clients to collect their files and to
            remove any trash, food or drinks brought into the studio. It helps
            make the switch between clients quick and easy and allows for us to
            offer our clients full 12-hour slots at affordable rates. Any
            excessive mess or damage is subject to a $80 fee.
          </RegularText>
          <LargeText bold>
            {`\n\n`}STUDIO & EQUIPMENT SUPPLIED:{`\n`}
          </LargeText>
          <RegularText>
            A support tab on our app is available for basic troubleshooting, but
            it is not intended for the purpose of running your session. We are
            responsible for the funcionality of our studio, however by booking
            with us, it is required that you are or will be assisted by an
            experienced engineer.{`\n`}The studio is not liable for acts out of
            its control that affect the session, such as power outages, weather,
            emergencies, or Acts of God. Renter agrees to return all equipment,
            studio, and furniture in the condition it was provided and to
            immediately notify the studio of any damage, failure, or change in
            equipment provided.
          </RegularText>
          <LargeText bold>
            {`\n\n`}CAPACITY:{`\n`}
          </LargeText>
          <RegularText>
            The capacity of persons is listed in the app for each specific room.
            Please abide by it otherwise you will be charged a fee of $50 per
            extra person.
          </RegularText>
          <View style={{flexDirection: 'row', width:'80%', marginVertical: 10  }}>
            <CheckBoxTitle
              checked={termAccept}
              onPress={() => setTermsAccepted(!termAccept)}
              title=""
            />
            <RegularText>
              By checking this box you agree to the Rental Agreement , 
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://hithouse.app')}>
                Terms of Service
              </Text>
              <RegularText>, and </RegularText>
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://hithouse.app')}>
                Privacy Policy
              </Text>
            </RegularText>
          </View>
        </Content>
        <View style={styles.btnContainer}>
          
          <SolidButton
            disabled={!termAccept}
            title="Next"
            buttonStyle={
              termAccept
                ? styles.acceptButtonStyle
                : styles.acceptButtonDisabledStyle
            }
            onPress={accept}
          />
          {/* <SolidButton
            title="Decline"
            buttonStyle={styles.declineButtonStyle}
            textStyle={{color: 'black'}}
            onPress={decline}
          /> */}
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default TermsAndCondition;
