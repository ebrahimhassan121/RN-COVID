import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '@src/component/custom-text';
export default function EmptyData() {
  return (
    <View testID="emptyComponent" style={styles.container}>
      <Ionicons
        name="newspaper-outline"
        color={'gray'}
        size={responsiveFontSize(10)}
      />
      <CustomText style={styles.textInfo} type="h1" disabled>
        {'No Result Founded '}
      </CustomText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(60),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {alignSelf: 'center'},
});
