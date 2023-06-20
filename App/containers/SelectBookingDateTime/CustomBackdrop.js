import React, {useMemo} from 'react';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {Pressable} from 'react-native';

const CustomBackdrop = ({
  animatedIndex,
  isShowSelectSection = false,
  style,
  onPress = () => {},
}) => {
  const animatedOpacity = useMemo(
    () =>
      interpolate(animatedIndex, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
      }),
    [animatedIndex],
  );

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        opacity: animatedOpacity,
      },
    ],
    [style, animatedOpacity],
  );

  return (
    <Animated.View
      style={containerStyle}
      pointerEvents={isShowSelectSection ? 'auto' : 'none'}>
      <Pressable style={{flex: 1}} onPress={onPress} />
    </Animated.View>
  );
};

export default CustomBackdrop;
