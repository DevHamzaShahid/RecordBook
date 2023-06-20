import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Switch,
  Text,
} from 'react-native';

import {KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory';

let inputs = [
  {
    placeholder: 'Enter first name',
    keyboardType: 'default',
    autoComplete: 'name',
  },
  {
    placeholder: 'Enter last name',
    keyboardType: 'default',
    autoComplete: 'familyName',
  },
  {
    keyboardType: 'default',
    placeholder: 'Enter address',
    autoComplete: 'fullStreetAddress',
  },
  {
    keyboardType: 'numeric',

    placeholder: 'Enter phone number',
  },
  {
    keyboardType: 'email-address',
    autoComplete: 'emailAddress',
    placeholder: 'Enter email address',
  },
  {
    keyboardType: 'default',

    placeholder: 'Create Password',
  },
  {
    keyboardType: 'default',

    placeholder: 'Enter Instagram username',
  },
];

class NavigationViewExample extends Component {
  constructor(props) {
    super(props);

    inputs = inputs.map((input) => ({
      ref: React.createRef(),
      ...input,
    }));

    this.state = {
      activeInputIndex: 0,
      nextFocusDisabled: false,
      previousFocusDisabled: false,
      buttonsDisabled: false,
      buttonsHidden: false,
    };
  }

  handleFocus = (index) => () => {
    this.setState({
      nextFocusDisabled: index === inputs.length - 1,
      previousFocusDisabled: index === 0,
      activeInputIndex: index,
    });
  };

  handleFocusNext = () => {
    const {nextFocusDisabled, activeInputIndex} = this.state;
    if (nextFocusDisabled) {
      return;
    }

    inputs[activeInputIndex + 1].ref.current.focus();
  };

  handleFocusPrevious = () => {
    const {previousFocusDisabled, activeInputIndex} = this.state;
    if (previousFocusDisabled) {
      return;
    }

    inputs[activeInputIndex - 1].ref.current.focus();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.switchInput}>
            <Switch
              value={this.state.buttonsHidden}
              onValueChange={() => {
                this.setState({
                  buttonsHidden: !this.state.buttonsHidden,
                });
              }}
            />
            <Text style={styles.switchInputText}>Hide arrows</Text>
          </View>
          {inputs.map(
            ({placeholder, keyboardType, ref, autoComplete}, index) => (
              <TextInput
                key={`input_${index}`}
                ref={ref}
                style={styles.textInput}
                inputStyle={styles.inputStyle}
                underlineColorAndroid="transparent"
                placeholder={placeholder}
                keyboardType={keyboardType}
                blurOnSubmit={false}
                onFocus={this.handleFocus(index)}
                secureTextEntry={index == 5 ? true : false}
                value={
                  index == 0
                    ? firstName
                    : index == 1
                    ? lastName
                    : index == 2
                    ? address
                    : index == 3
                    ? phoneNumber
                    : index == 4
                    ? email
                    : index == 5
                    ? password
                    : insta
                }
                autoComplete={autoComplete}
                error={
                  index == 0
                    ? errors.firstName && errors.firstName[0]
                    : index == 1
                    ? errors.lastName && errors.lastName[0]
                    : index == 2
                    ? errors.address && errors.address[0]
                    : index == 3
                    ? errors.phoneNumber && errors.phoneNumber[0]
                    : index == 4
                    ? errors.email && errors.email[0]
                    : index == 5
                    ? errors.password && errors.password[0]
                    : null
                }
                onChangeText={(text) => {
                  if (index == 0) {
                    onChangeFirstName(text), setErrors({});
                  } else if (index == 1) {
                    onChangeLastName(text), setErrors({});
                  } else if (index == 2) {
                    onChangeAddress(text);
                    setErrors({});
                  } else if (index == 3) {
                    changePhone(text);
                  } else if (index == 4) {
                    onChangeEmail(text.replace(/ /g, ''));
                    setErrors({});
                  } else if (index == 5) {
                    onChangePassword(text);
                  } else if (index == 6) {
                    onChangeInsta(text);
                  }
                }}>
                {index == 3 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setIsCCModalVisible(true);
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CountryPicker
                        withFilter
                        withAlphaFilter
                        visible={isCCModalVisible}
                        renderFlagButton={(e) => {
                          return (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <MediumText>
                                {country.callingCode
                                  ? '+' + country.callingCode
                                  : '+1'}
                              </MediumText>
                            </View>
                          );
                        }}
                        onSelect={(e) => {
                          setCountry(e);
                          console.log(JSON.stringify(e));
                        }}
                        onClose={() => {
                          setIsCCModalVisible(false);
                        }}
                      />

                      <Image
                        style={{marginStart: 5, height: 15, width: 15}}
                        source={require('../../../assets/down_arrow.png')}></Image>
                    </View>
                  </TouchableOpacity>
                ) : index == 4 ? (
                  <Image
                    source={Images.email}
                    style={styles.icon}
                    resizeMode={'contain'}
                  />
                ) : index == 5 ? (
                  <Image
                    source={Images.lock}
                    style={styles.icon}
                    resizeMode={'contain'}
                  />
                ) : index == 6 ? (
                  <Image
                    source={Images.instagram}
                    style={styles.icon}
                    resizeMode={'contain'}
                  />
                ) : null}
              </TextInput>
            ),
          )}
        </ScrollView>
        <KeyboardAccessoryNavigation
          nextDisabled={this.state.nextFocusDisabled}
          previousDisabled={this.state.previousFocusDisabled}
          nextHidden={this.state.buttonsHidden}
          previousHidden={this.state.buttonsHidden}
          onNext={this.handleFocusNext}
          onPrevious={this.handleFocusPrevious}
          avoidKeyboard
          androidAdjustResize
        />
      </View>
    );
  }
}
NavigationViewExample.navigationOptions = {
  title: 'Navigation View Example',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 30,
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  switchInput: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  switchInputText: {
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default NavigationViewExample;
