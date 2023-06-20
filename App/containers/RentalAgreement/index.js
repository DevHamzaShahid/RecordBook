import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, SafeAreaView, Text, View} from 'react-native';
import {Content} from 'native-base';
import Actions from '../MyBooking/reducer';
import {SolidButton} from '@Buttons';
import {LargeText, RegularText} from '@Typography';
import SectionHeader from '../../components/SectionHeader';
import CheckBoxTitle from '../../components/CheckBoxTitle';
import SignatureCapture from 'react-native-signature-capture';
import {Colors} from '@common';
import styles from './styles';
import moment from 'moment';

const FileSystem = require('react-native-fs');

const RentalAgreement = ({navigation, route}) => {
  const refs = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const booking = useSelector((state) => state.booking);
  const [termAccept, setTermsAccepted] = useState(booking.termsAccepted);
  const [modalVisible, setModalVisible] = useState(false);

  const _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  const saveSign = () => {
    console.log(refs.current.saveImage());
    refs.current.saveImage();
  };

  const resetSign = () => {
    refs.current.resetImage();
  };

  const _onSaveEvent = (result) => {
    const {onChange} = route.params;
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result, '===========');
    const path = FileSystem.TemporaryDirectoryPath + '/signature.png';
    FileSystem.writeFile(path, result.encoded, 'base64')
      .then((success) => {
        console.log(success, '===========');
        dispatch(Actions.setTermsAccepted(true));
        navigation.goBack();
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Studio Rental Agreement" />
      <Content padder>
        <RegularText>
          This Studio Rental Agreement (“Agreement”) is entered into as of{' '}
          <Text style={styles.underline}>{moment().format('DD-MM-YYYY')}</Text>,
          by and between Recordbook, Inc. (“Company”), at 15260 Ventura Blvd.,
          Suite 1750 Sherman Oaks, CA 91403, and the party executing this
          Agreemen <Text style={styles.underline}>{user.full_name}</Text> at
          address <Text style={styles.underline}>{user.address}</Text>
          (“Client”) and booking a Studio Billing Period through the Recordbook
          studio rental mobile application or website (each, the “App”)
        </RegularText>
        <RegularText>
          {'\n'}Based upon the mutual promises contained herein and other good
          and valuable consideration the receipt and sufficiency of which is
          hereby acknowledged, Company and Client do hereby agree as follows.
        </RegularText>
        <LargeText bold>
          {'\n\n'}1). PURPOSE AND DESCRIPTION OF STUDIO.
        </LargeText>
        <RegularText>
          {`\n`}Recordbook operates a facility at the address listed above or
          otherwise described in the App (each the “Property”), which Property
          contains one or more rooms (each a “Studio”) and common areas for the
          other Recordbook clients.
          {`\n\n`}
          The parties have entered into this Agreement either by means of the
          App, in-person on paper, or other electronic means, for the purpose of
          leasing or renting that one certain Studio as indicated in Client’s
          shopping cart and upon the terms and conditions contained herein, with
          the express understanding and agreement that no bailment or deposit of
          goods for safekeeping is intended or created hereunder.
          {`\n\n`}Recordbook leases to Client and Client leases from Recordbook
          the particular Studio. Client has reviewed the Studio (it being
          specifically understood and agreed by Client that the exact equipment
          and/or furniture in, and/or decor of a particular Studio may be
          adjusted by Recordbook from time-to-time and at any time and without
          notice, and such alterations shall not in any way affect the
          enforceability of this Agreement) and the Property through the
          Recordbook App and acknowledges and agrees that the Studio and the
          common areas of the Property are satisfactory for all purposes for
          which Client shall use the Studio. Client shall have access to the
          Studio and the common areas of the Property upon the terms and
          conditions described herein, and only during such Booking Period(s)
          for which Client has both (i) booked through the App and (ii)
          pre-paid, in full.
        </RegularText>
        <LargeText bold>
          {'\n\n'}2). STUDIO EQUIPMENT AND STAFF / ENGINEER.
        </LargeText>
        <RegularText>
          {`\n`}Recordbook agrees to provide the Studio and all equipment listed
          on the App as being installed within that particular Studio in good
          working order, but makes no special guarantees as to particular
          Studios’ functionality or suitability to Client’s purposes.
          {`\n\n`}Client is entitled to use the entire Studio, its equipment,
          and any furniture in the studio at the time of the Booking Period.
          Client shall not move any equipment fixed in place. Client may move
          small furniture, but all items must be returned to their original
          position and location including removed plugs and setup.
          {`\n\n`}Client agrees to return the Studio and all equipment and
          furniture therein in the exact condition as it was provided at the
          beginning of the Billing Period. Client shall immediately notify the
          Studio of any damage, failure, or change in equipment provided. Client
          will be charged for any damaged, lost or stolen equipment or furniture
          incurred during the Billing Period, caused by client or any individual
          present during the client's billing period.
          {`\n\n`}
          Recordbook provides 24 hour technical support for Studio
          troubleshooting such as faulty equipment. Studios are designed to be
          reserved and run by a Client’s qualified audio engineer. Recordbook
          will not provide assistance in connection with general engineering
          questions or functions. Recordbook staff are not available for
          ‘runner’ duties. If a Client needs assistance recording, they must
          arrange their own audio engineer or hire one of our Recordbook
          engineers.
          {`\n`}Audio engineering services are not included in the Studio
          Rental, and are offered by Recordbook at additional hourly rates plus
          bookings fees, and upon the following terms (which terms may be
          updated at any time by posting on the App, provided that fully paid
          for services shall not be affected by such changes).
          {`\n\n`}Audio engineer services are available at an additional rate of
          $25/hr. with a minimum of 4 hours. Clients will specify the
          commencement time for as well as the total number of hours they
          require to hire an audio engineer during their Billing Period and will
          be charged from that specific set start time regardless of whether a
          Client is late to commence their session. Audio engineer hours may be
          extended, subject to prior bookings via upfront payment on the
          Recordbook App.
        </RegularText>
        <LargeText bold>{'\n'}3). TERM / BOOKING PERIOD.</LargeText>
        <RegularText>
          {'\n'}The term of this Rental Agreement shall commence as of the
          commencement of each fully-paid Booking Period and shall continue
          until the end of such Billing Period, as same may be extended as
          provided for hereunder.
        </RegularText>
        <RegularText>
          {'\n'}Client acknowledges that they understand and agree that:
          {`\n\n\t`}(i){'\t'}A Booking Period is not booked and not guaranteed
          unless and until paid for in full;
          {`\n\t`}(ii) Each Booking Period shall be for a period of twelve (12)
          continuous hours, either from 8am – 8pm, or 8pm – 8am;
          {`\n\t`}(iii) Notwithstanding Para 3(ii) to the contrary, Recordbook
          may, subject to availability (with the understanding that Recordbook
          is not required to do so) create booking periods of customized length,
          each a “Custom Billing Period” and the term Billing Period as used
          herein shall in all respects other than length be deemed to include
          any Customized Billing Period;
          {`\n\t`}(iv) Recordbook operates 24-hours per day and that Client’s
          Studio is likely booked for the next Booking Period that Client’s own
          Booking Period shall begin and end exactly on time, without exception,
          regardless of what time Client arrives;
          {`\n\t`}(v) 30 minutes per Booking Period will be used by Recordbook
          staff to clean and prepare the Studio. This will occur during the
          first 15-minutes and last 15-minutes of each Booking Period;
          {`\n\t`}(vi) Recordbook staff will be preparing and cleaning the
          studio during the first and last 15 minutes of Client’s Booking
          Period;
          {`\n\t`}(vii) Client will be prepared to vacate the Studio at
          15-minutes prior to the end their Booking Period and allow Recordbook
          staff to begin resetting the studios;
          {`\n\t`}(viii) Client (and all persons with Client) will exit the
          Property promptly following the end of their Booking Period.
          {`\n\t`}(ix) Client may reserve multiple contiguous Booking Periods,
          subject to all of the terms and conditions of this Agreement,
          including, without limitation that each must be paid in full to be
          deemed confirmed.
          {`\n\t`}(x) Recordbook may, but is not required to extend a Booking
          Period based upon Studio availability, and payment in full and in
          advance of any additional Rent.
          {`\n\t`}(xi) Recordbook may cancel or reschedule a Booking Period at
          any time and for any or no reason, and Client understands and agrees
          that their sole remedy in the case of cancelation shall be either (i)
          rescheduling or (ii) refund of the Rent previously paid, with the
          choice of which being determined by Recordbook in the exercise of its
          sole business judgment.
          {`\n\t`} (xii) Company permits service animals into studio locations
          but deems Client responsible for animals at all times including
          cleaning of any mess caused by an animal.
          {`\n\t`} (xiii) Client must remove all items brought into the studio,
          including client’s trash and personal belongings.
        </RegularText>
        <RegularText bold>{'\n\n'}4). RENT.</RegularText>
        <RegularText>
          {'\n'}Client acknowledges that the payment (“Rent”) required for each
          Studio may vary as set forth on the App. Client shall pay Recordbook
          the Rent through the App. All Rent must without exception be paid in
          full and in advance to confirm each Booking Period. In addition to the
          stated Rent, Client shall pay an additional billing admin fee equal to
          2.9% of the Rent, plus $0.30, per Booking Period. While Client may,
          subject to availability, reschedule a Booking Period and not later
          than 48-hours prior to the scheduled start time of the original
          Booking Period, Client understands and agrees that{' '}
          <Text style={styles.underline}>under no circumstances</Text> will
          Client be entitled to a refund of the Rent. The Rent for each Studio
          may be adjusted by RecordBook effective when posted to the App,
          provided, however, that once paid in full, the Rent for a scheduled
          Booking Period will not be changed.
        </RegularText>
        <LargeText bold>
          {'\n\n'}5). USE OF STUDIO AND PROPERTY AND COMPLIANCE WITH LAW.
        </LargeText>
        <RegularText>
          {'\n'}Client acknowledges that they understand and agree that:
          {`\n\n\t`}(i) Client shall not permit any Hazardous Materials to be
          brought into the Studio or the Property. “Hazardous Materials” shall
          include but not be limited to any hazardous or toxic chemical, gas,
          liquid, substance, material or waste that is or may become regulated
          under any applicable local, state or federal law or regulation,
          including, without limitation, flammable materials, explosives or
          other inherently dangerous material;
          {`\n\t`}(ii) Client shall not bring any personal property into the
          Studio or Property which would result in the violation of any law or
          regulation of any government authority, including without limitation,
          all laws and regulations relating to Hazardous Materials, waste
          disposal, drug use, and Client shall comply with all laws, rules
          regulations of any and all governmental authorities concerning the
          Studio and its use. For the purpose of this Rental Agreement;
          {`\n\t`}(iii) Client shall respect the neighbors and other clients of
          Recordbook at all times and shall not use the Studio or Property in
          any manner that will constitute waste, nuisance or unreasonable
          annoyance to our neighbors and/or other clients in the Property;
          {`\n\t`}(iv) Client shall not smoke tobacco or use tobacco products in
          the Studio or Property. Violation of this rule shall result in refusal
          to provide Client with Studio use in the future and a fine of $200;
          {`\n\t`}(v) Client shall not undertake any illegal activity in or
          around the Studio and/or Property, including, without limitation any
          parking areas;
          {`\n\t`}(vi) Client shall personally and at all times monitor and
          maintain adult supervision of all minors on Property;
          {`\n\t`}(vii) Client shall be completely responsible for any and all
          guests (which shall not exceed the posted occupancy for the Studio) at
          all times, and each of the terms and conditions of this Agreement
          shall apply with equal force to each guest;
          {`\n\t`}(viii) Upon conclusion of each Booking Period Client shall
          remove from the Studio all personal property, including, but not
          limited to all software, files (music or otherwise), equipment, and
          garbage
          {`\n\t`}(ix) While Client may enter and exist through and utilize the
          bathroom within the Property, Client shall stay and keep its guests
          within the Studio during the Booking Period;
          {`\n\t`}(x) While the Property is under 24/7 monitoring, Recordbook
          shall not be required to provide surveillance footage to any Client;
          {`\n\t`}(xi) Use by Client (or its guests) of on-Property parking
          shall be by prearranged agreement, only, 24/7. Parking spots within
          studios parking lots are specifically assigned to neighboring studios
          outside of Recordbooks entity. Failure to follow such parking
          limitations will lead to towing of Client’s car at Client’s expense.
          Client is responsible for their own legal parking both on property and
          off property street parking.
          {`\n\t`}(xii) Recordbook is not responsible for any lost or stolen
          items inside and outside the studio premises including but not limited
          to the parking areas.
          {`\n\t`}For avoidance of any confusion, Client shall immediately
          deliver possession of the Studio to Recordbook in the exact same
          condition as delivered to Client on the commencement of the Booking
          Period. Client acknowledges that given the short duration of each
          Booking Period that there shall be no exception for so-called
          reasonable wear and tear.
        </RegularText>
        <LargeText bold>
          {'\n\n'}6). ASSUMPTION OF RISK. ALL OF CLIENT’S PROPERTY IS BROUGHT
          INTO THE PROPERTY AND THE STUDIO, AND/OR LEFT IN CLIENT’S VEHICLE
          (EVEN IF PARKED IN THE PROPERTY PARKING LOT) BY CLIENT AT CLIENT’S
          SOLE AND EXCLUSIVE RISK, INSURANCE IS CLIENT’S SOLE RESPONSIBILITY.
          CLIENT UNDERSTANDS THAT RECORDBOOK WILL NOT INSURE CLIENT’S PROPERTY.
        </LargeText>
        <RegularText>
          {'\n'}Client agrees Client will personally assume all risk of loss,
          including damage or loss by burglary, fire, vandalism or vermin.
          Recordbook and Recordbook’s owners, staff, agents, affiliates,
          authorized representatives and employees, including engineers
          (“Recordbook’s Agents”) will not be responsible for, and Client hereby
          releases Recordbook and Recordbook’s Agents from any responsibility
          for any loss, liability, claim, expense, damage to property or injury
          to persons (“Loss”) (including without limitation any loss arising
          from the active or passive acts, omission or negligence of Recordbook
          or Recordbook’s Agents) and, furthermore, Client understands that
          because Recordbook operates 24 hours per day that there may at any
          time be a wet floor or other obstacle and that Client shall obey any
          instructions of Recordbook’s Agents (including, without limitation any
          posted signs or other warnings, e.g., “wet floor” markers) and Client
          shall be solely responsible for any injury caused by its own
          negligence or reckless behavior (individually and collectively, the
          “Released Claims”).
        </RegularText>
        <LargeText bold>
          {'\n\n'}7). LIMITATION OF RECORDBOOK’S LIABILITY; INDEMNITY.
        </LargeText>
        <RegularText>
          {'\n'}Recordbook and Recordbook’s Agents will have no responsibility
          to Client or to any other person for any loss, liability, claim,
          expense, damage to property or injury to person’s (“Loss”) from any
          cause, including without limitation, Recordbook and Recordbook’s
          Agents’ active or passive acts, omissions, negligence or conversion,
          unless the Loss is directly caused by Recordbook’s fraud or willful
          injury or willful violation of law.
          {'\n\n'}Client is reminded to be sure to save all files as Recordbook
          is not responsible to store or send any files remaining in the Studio
          (including, without limitation in any equipment located within the
          Studio) at the conclusion of the Billing Period. Recordbook clears
          each hard drive daily and is not liable for any lost sessions or
          privacy breaches.
          {'\n\n'}Recordbook is not liable for any loss or damage resulting from
          any event of force majeure or other act or omission out of Recordbook
          control, including, without limitation, such as power outages,
          weather, emergencies, or Acts of God.
          {'\n\n'}Client shall indemnify and hold Recordbook and Recordbook’s
          Agents harmless from any Loss incurred by Recordbook and Recordbook’s
          Agents in any way arising out of Client’s use of the Studio or the
          Property.
        </RegularText>
        <LargeText bold>
          {'\n\n'}8). RIGHT TO ENTER; INSPECT AND REPAIR STUDIO.
        </LargeText>
        <RegularText>
          {'\n'}Client shall grant Recordbook, Recordbook’s agents or the
          representatives of any governmental authority, including police and
          fire officials, access to the Studio at any time as may be required
          due to exigent circumstances. Recordbook, Recordbook’s agents or the
          representative of any governmental authority shall have the right, but
          not the obligation, to enter the Studio for the purpose of examining
          the Studio or the contents thereof or for the purpose of making
          repairs or alterations to the Studio and taking such other action as
          may be necessary or appropriate to preserve the Studio and/or its
          contents, or to comply with applicable law including any applicable
          local, state or federal law or regulation governing Hazardous
          Materials, or to enforce any of Recordbook’s rights.
          {'\n\n'}
          In the event of any damage or injury to the Studio (including its
          contents), the Property and/or any Recordbook Agent(s) arising from
          the negligent or deliberate act or omissions of the Client, or for
          which Client is otherwise responsible, or if Client fails to remove
          all personal property from the Studio upon termination of each Billing
          Period, all expenses incurred by the RecordBook to repair or restore
          the Studio or the property or any RecordBook Agent, including in
          connection with any investigation of site conditions, or any clean-up,
          removal or restoration work required, shall be paid by the Client as
          additional rent shall be due upon demand by Recordbook, and Recordbook
          shall have the right to charge same against any payment method on file
          for Client.
        </RegularText>
        <LargeText bold>{'\n\n'}9). TERMINATION AND DEFAULT.</LargeText>
        <RegularText>
          {'\n'}Recordbook may terminate this Studio Rental Agreement at any
          time upon Client’s default under any of their obligations under this
          Agreement, and Recordbook may pursue any and all remedies available to
          Recordbook under applicable law or this Agreement. Recordbook’s
          decision to pursue one remedy shall not prevent Recordbook from
          pursuing other available remedies.
        </RegularText>
        <LargeText bold>{'\n\n'}10). RULES AND REGULATIONS.</LargeText>
        <RegularText>
          {'\n'}The rules and regulations posted from time-to-time in a
          conspicuous place at the Property and/or within the Studio are made a
          part of this Agreement as if set forth herein, and Client shall comply
          at all times with such rules and regulations.
        </RegularText>
        <LargeText bold>{'\n\n'}11). NO WARRANTIES.</LargeText>
        <RegularText>
          {'\n'}Recordbook hereby disclaims any implied or express warranties or
          representations of the nature, condition, safety or security of the
          Studio and the Property and Client hereby acknowledges, as provided in
          paragraph 1 above, that Client has inspected the Studio and the
          Property and hereby acknowledges that Recordbook does not represent or
          guarantee the safety of the Property or of any personal property
          stored therein, and this Agreement does not create any contractual
          obligation for Recordbook to increase or maintain such safety or
          security. With the exception of posted rules and regulations as noted
          in paragraph 11, there are no representations, warranties or
          agreements by or between the parties which are not fully set forth
          herein and no representation of Recordbook or Recordbook’s Agents is
          authorized to make any representations, warranties, or agreements
          other than as expressly set forth herein.
        </RegularText>
        <LargeText bold>{'\n\n'}11). MISCELLANEOUS.</LargeText>
        <RegularText>
          {'\n'}(a). This Agreement sets forth the entire understanding of the
          parties hereto with respect to the subject matter hereof and
          supersedes and replaces any prior agreement between the parties in
          connection with the Studio. No modification of this Agreement shall be
          binding unless confirmed by a written instrument signed by Recordbook.
          A waiver by Recordbook of any provision of this Agreement in any
          instance shall not be deemed to waive such provision for the future.
          {'\n'}(b). Recordbook shall be deemed to be in breach of their
          respective obligations hereunder unless such party fails to remedy
          such breach within thirty (30) days after receipt of written notice
          from the other party specifying the details of such breach.
          {'\n'}(c). This Agreement shall be construed and interpreted in
          accordance with the laws of the State of California applicable to
          contracts made and to be wholly performed therein without regard to
          its choice of law statutes. In connection therewith, Client hereby
          consents to the exclusive jurisdiction of the State and Federal courts
          located within the city of Los Angeles in the state of California in
          connection with any dispute arising out of any party’s rights or
          obligations pursuant to this Agreement.
          {'\n'}(d). Client may not assign this Agreement or any of Client’s
          obligations hereunder.
          {'\n'}(e). The relationship between the parties is that of independent
          contractors and nothing contained or implied herein shall be deemed to
          create any other relationship.
          {'\n'}(f). If any provision of this Agreement shall be held void,
          invalid or inoperative, no other provision of this Agreement shall be
          affected as a result thereof, and accordingly, the remaining
          provisions of this Agreement shall remain in full force and effect as
          though such void, invalid or inoperative provision had not been
          contained herein.
          {'\n'}(g). All references to Client shall apply with equal force to
          each guest or visitor of Client.
          {'\n'}(h). This Agreement may be executed simultaneously in any number
          of counterparts. Each counterpart shall be deemed to be an original,
          and all such counterparts shall constitute one and the same
          instrument. The parties agree that this Agreement and any notices
          hereunder may be transmitted between them by email and/or by other
          digital means. The parties intend that electronically imaged
          signatures such as .pdf files, including without limitation from
          digital signature applications, such as DocuSign shall constitute
          original signatures and are binding on all parties.
          {'\n'}(i). Client acknowledges that it has read and understood all of
          the terms and provisions of this Agreement, and that Recordbook has
          advised Client that this is an important legal document and that
          Client has the right to seek counsel from an attorney of Client’s
          choosing, and in executing this Agreement, Client has either received
          such advice or intentionally waived its right to do so. Further,
          Client acknowledges that it has cooperated in the drafting and
          preparation of this Agreement and it may not be construed against
          either party by reason of its preparation.
        </RegularText>
        {/* <RegularText bold>{'\n'}Accepted and Agreed:</RegularText>
        <RegularText>{'\n'}Client:{'\n'}RecordBook, Inc</RegularText>
        <RegularText>{'\n'}By: </RegularText>
        <RegularText>{'\n'}Signed: </RegularText>
        <RegularText>{'\n'}Date: </RegularText>
        <RegularText>{'\n'}Company:{'\n'}</RegularText>
        <RegularText>{'\n'}Authorized Signatory{'\n'}CEO Omar Kadir</RegularText> */}

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <CheckBoxTitle
            checked={termAccept}
            onPress={() => setTermsAccepted(!termAccept)}
            title=""
          />
          <RegularText bold>Accepted and Agreed</RegularText>
        </View>
      </Content>
      <View style={styles.btnContainer}>
        <SolidButton
          disabled={!termAccept}
          title="E-Signature"
          buttonStyle={
            termAccept
              ? styles.acceptButtonStyle
              : styles.acceptButtonDisabledStyle
          }
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.semiTransparent} />
        <View style={styles.container}>
          <View style={styles.signature}>
            <RegularText bold textStyle={{textAlign: 'center'}}>
              Please draw your signature in the white box.
            </RegularText>
          </View>
          <SignatureCapture
            style={styles.signature}
            ref={refs}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            saveImageFileInExtStorage={true}
            showNativeButtons={false}
            showTitleLabel={false}
            backgroundColor={Colors.white}
            strokeColor={Colors.black}
            minStrokeWidth={4}
            maxStrokeWidth={4}
            viewMode={'portrait'}
          />
          <View style={styles.agreementButtonStyle}>
            <SolidButton
              // disabled={!termAccept}
              title="Reset"
              buttonStyle={styles.resetButtonStyle}
              onPress={resetSign}
            />
            <SolidButton
              title="Save"
              buttonStyle={styles.saveButtonStyle}
              onPress={saveSign}
            />
            <SolidButton
              // disabled={!termAccept}
              title="Cancel"
              buttonStyle={styles.cancelButtonStyle}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RentalAgreement;
