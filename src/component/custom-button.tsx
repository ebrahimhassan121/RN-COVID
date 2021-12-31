import {themeColors} from '@src/styles/common';
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import CustomText, {ICustomTextProps} from './custom-text';
interface IProps extends TouchableOpacityProps {
  textProps?: ICustomTextProps;
}
export default function CustomButton(props: IProps) {
  const {textProps, children, ...buttonProps} = props;
  return (
    <TouchableOpacity
      style={[styles.button, buttonProps.style]}
      testID="customButton"
      {...buttonProps}>
      <CustomText
        type="h4"
        {...textProps}
        style={[styles.buttonText, textProps?.style]}>
        {children}
      </CustomText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: themeColors.card,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 8,
  },
  buttonText: {color: themeColors.primary, alignSelf: 'center'},
});
