import CustomText from '@src/component/custom-text';
import ICountry from '@src/interfaces/ICountry';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {NumberFormater} from '@src/utils/numbers';

interface ICountryItemProps {
  item: ICountry;
  index: number;
}
const cellWidth = responsiveWidth(100 / 7);
export default function CountryItem(props: ICountryItemProps) {
  const country = props.item;
  const rowData = [
    country.CountryCode,
    country.NewConfirmed,
    country.NewDeaths,
    country.NewRecovered,
    country.TotalConfirmed,
    country.TotalDeaths,
    country.TotalRecovered,
  ];
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {rowData.map((field, index) => (
          <CustomText
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.countryFieldCell}
            type="h5">
            {index !== 0 ? NumberFormater(Number(field)) : field}
          </CustomText>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 8, paddingHorizontal: 4},
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  countryFieldCell: {
    width: cellWidth,
    paddingLeft: 4,
  },
});
