import React, {useEffect, useState, useImperativeHandle, useRef} from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import MediumText from '../Typography/MediumText';
import {Colors, Fonts} from '../../common';
import SmallText from '../Typography/SmallText';

const TextInput = React.forwardRef(
  (
    {
      title,
      placeholder,
      children,
      style,
      autoFocus = false,
      value,
      onChangeText,
      keyboardType,
      error,
      secureTextEntry,
      inputStyle,
      borderColor,
      borderActiveColor,
      onBlur,
      borderBottomWidth = 1,
      autoComplete,
      submit,
      autoCapitliz,
      ...res
    },
    ref,
  ) => {
    const [forced, setForced] = useState(false);

    const textInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        textInputRef.current.focus();
      },
    }));
    return (
      <View style={style} ref={ref}>
        {title && (
          <MediumText textStyle={forced ? styles.focused : styles.notFocused}>
            {title}
          </MediumText>
        )}

        <View
          style={[
            styles.inputView,
            borderColor && {borderColor, borderBottomWidth},
            borderActiveColor && forced && {borderColor: borderActiveColor},
          ]}>
          {children}

          <RNTextInput
            ref={textInputRef}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            //onChange={onChangeText}
            onFocus={() => {
              setForced(true);
            }}
            onBlur={() => {
              setForced(false);
              onBlur?.();
            }}
            inputMode={keyboardType}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={Colors.lightGray}
            autoCapitalize={autoCapitliz}
            autoCorrect={false}
            autoFocus={autoFocus}
            textContentType={autoComplete}
            
            //onSelectionChange={submit}
            //onSubmitEditing={submit}
            //onAccessibilityTap={submit}
            {...res}
          />
        </View>

        <SmallText bold textStyle={styles.error}>
          {error}
        </SmallText>
      </View>
    );
  },
);

// function TextInput({
//   title,
//   placeholder,
//   children,
//   style,
//   autoFocus = false,
//   value,
//   onChangeText,
//   keyboardType,
//   error,
//   secureTextEntry,
//   inputStyle,
//   borderColor,
//   borderActiveColor,
//   onBlur,
//   borderBottomWidth = 1,
//   autoComplete,

//   ...res
// }) {
//   const [forced, setForced] = useState(false);

//   return (
//     <View style={style}>
//       {title && (
//         <MediumText textStyle={forced ? styles.focused : styles.notFocused}>
//           {title}
//         </MediumText>
//       )}

//       <View
//         style={[
//           styles.inputView,
//           borderColor && {borderColor, borderBottomWidth},
//           borderActiveColor && forced && {borderColor: borderActiveColor},
//         ]}>
//         {children}

//         <RNTextInput
//           secureTextEntry={secureTextEntry}
//           keyboardType={keyboardType}
//           value={value}
//           onChangeText={onChangeText}
//           onFocus={() => {
//             setForced(true);
//           }}
//           onBlur={() => {
//             setForced(false);
//             onBlur?.();
//           }}
//           style={[styles.input, inputStyle]}
//           placeholder={placeholder}
//           placeholderTextColor={Colors.lightGray}
//           autoCapitalize={'none'}
//           autoCorrect={false}
//           autoFocus={autoFocus}
//           textContentType={autoComplete}
//           {...res}
//         />
//       </View>

//       <SmallText bold textStyle={styles.error}>
//         {error}
//       </SmallText>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  error: {
    margin: 8,
    color: Colors.red,
  },
  inputView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    color: Colors.white,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.large,
    height: 45,
    flex: 1,
  },
  notFocused: {
    color: Colors.lightGray,
    marginBottom: 4,
  },
  focused: {
    color: Colors.white,
    marginBottom: 4,
  },
});

export default TextInput;
