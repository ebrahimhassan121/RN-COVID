import CustomText from '@src/component/custom-text';
import {themeColors} from '@src/styles/common';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {NumberFormater} from '@src/utils/numbers';
import CustomButton from '@src/component/custom-button';
import {useNavigation} from '@react-navigation/native';
import {navigationRoutesNames} from '@src/utils/navigators';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCountriesData} from '@src/state/countries';
import LoadingCardsSkeleton from '@src/component/skeletons/LoadingCardsSkeleton';
export default function Home() {
  const navigation = useNavigation();

  const {data, isLoading} = useCountriesData();
  if (isLoading || !data) {
    return (
      <SafeAreaView style={styles.flexOne}>
        <LoadingCardsSkeleton numberOfItems={4} />
      </SafeAreaView>
    );
  }

  const top5Confirmed =
    data?.Countries?.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(
      0,
      5,
    ) || [];
  return (
    <SafeAreaView style={styles.flexOne}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <CustomText type="h2">Good Morning,</CustomText>
        </View>
        <CustomText type="h1">Ebrahim</CustomText>
        <CustomText disabled style={styles.chartTitle} type="h4">
          Top 5: <CustomText>Total Confirmed By Country</CustomText>{' '}
        </CustomText>
        <LineChart
          data={{
            labels: top5Confirmed.map(e => e.CountryCode),
            datasets: [
              {
                data: top5Confirmed.map(e => e.TotalConfirmed),
              },
            ],
          }}
          width={responsiveWidth(98)}
          formatYLabel={value => NumberFormater(Number(value)) + ''}
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom:
              themeColors.chartColors.backgroundGradientFrom,
            backgroundGradientTo: themeColors.chartColors.backgroundGradientTo,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: themeColors.chartColors.stroke,
            },
          }}
          bezier
          style={styles.chartCard}
        />
        <CustomText disabled style={styles.chartTitle} type="h4">
          Top 5:{' '}
          <CustomText>Global Deaths, Recoveries and active cases</CustomText>{' '}
        </CustomText>
        <PieChart
          data={[
            // global deaths, recoveries and active cases
            {
              name: 'Death',
              population: data?.Global?.TotalDeaths || 0,
              color: '#333',
              legendFontColor: '#7F7F7F',
            },
            {
              name: 'Recovered',
              population: data?.Global?.TotalRecovered || 0,
              color: themeColors.chartColors.stroke,
              legendFontColor: '#7F7F7F',
            },
            {
              name: 'New Confirmed',
              population: data?.Global?.NewConfirmed || 0,
              color: 'grey',
              legendFontColor: '#7F7F7F',
            },
          ]}
          width={responsiveWidth(98)}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={'population'}
          backgroundColor={'white'}
          style={styles.chartCard}
          paddingLeft="0"
        />
        <CustomButton
          onPress={() => {
            //@ts-ignore
            navigation.navigate(navigationRoutesNames.countries.name);
          }}>
          More{' '}
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: responsiveWidth(2)},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartTitle: {marginTop: 16},
  chartCard: {
    borderRadius: 16,
  },
  flexOne: {
    flex: 1,
  },
});
