import {themeColors} from '@src/styles/common';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, TextProps} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
export interface ICustomTextProps extends TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  disabled?: boolean;
}
export default function CustomText(props: ICustomTextProps) {
  if (!props.type) {
    props.type = 'p';
  }
  return (
    <Text
      testID="customText"
      {...props}
      style={[
        styles.defaultStyle,
        styles[props.type],
        props.disabled && styles.disabled,
        props.style,
      ]}>
      {props.children}
    </Text>
  );
}
const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'Cairo-Medium',
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: themeColors.text,
  },
  h1: {
    fontSize: responsiveFontSize(5),
    fontFamily: 'Cairo-Medium',
  },
  h2: {
    fontSize: responsiveFontSize(4),
    fontFamily: 'Cairo-ExtraLight',
  },
  h3: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Cairo-SemiBold',
  },
  h4: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
  },
  h5: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
  },
  h6: {
    fontSize: 12,
    fontFamily: 'Cairo-Medium',
  },
  p: {
    fontSize: 10,
  },
  disabled: {
    color: 'gray',
  },
});
