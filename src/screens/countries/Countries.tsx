import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, FlatList, LayoutAnimation} from 'react-native';
import CustomText from '@src/component/custom-text';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TextInput} from 'react-native';
import {Animated} from 'react-native';
import {useDebounce} from 'use-debounce/lib';
import deviceInfoModule from 'react-native-device-info';
import {themeColors} from '@src/styles/common';
import CountryItem from './CountryItem';
import {useCountriesData} from '@src/state/countries';
import EmptyData from '@src/component/empty-data';
import ICountry from '@src/interfaces/ICountry';
const inputXPositionInitialValue = responsiveWidth(-100);
export default function Countries() {
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<{
    sort: 'asc' | 'desc';
    name?:
      | 'NewConfirmed'
      | 'NewDeaths'
      | 'NewRecovered'
      | 'TotalConfirmed'
      | 'TotalDeaths'
      | 'TotalRecovered';
  }>({
    sort: 'desc',
    name: 'NewConfirmed',
  });
  const [searchTextDebounced] = useDebounce(searchText, 300);
  const [filteredData, setFilteredData] = useState<ICountry[]>([]);
  const data = useCountriesData().data;
  useEffect(() => {
    let newData: ICountry[] | undefined;
    if (sortBy.name) {
      newData = data?.Countries.filter(
        ele =>
          ele.Country.toLowerCase().includes(searchTextDebounced) ||
          ele.CountryCode.includes(searchTextDebounced),
      ).sort((a, b) => {
        if (sortBy.sort === 'asc') {
          //@ts-ignore
          return a[sortBy.name] - b[sortBy.name];
        } else {
          //@ts-ignore
          return b[sortBy.name] - a[sortBy.name];
        }
      });
    } else {
      newData = data?.Countries.filter(
        ele =>
          ele.Country.toLowerCase().includes(searchTextDebounced) ||
          ele.CountryCode.includes(searchTextDebounced),
      );
    }
    //@ts-ignore
    setFilteredData(newData);
  }, [data?.Countries, searchTextDebounced, sortBy.name, sortBy.sort]);

  const inputXPosition = useRef(
    new Animated.Value(inputXPositionInitialValue),
  ).current;
  const TextInputRef = useRef<TextInput>();
  const unFocusInput = () => {
    Animated.spring(inputXPosition, {
      toValue: inputXPositionInitialValue,
      useNativeDriver: true,
    }).start();
    TextInputRef.current?.blur();
  };

  const focusInput = () => {
    if (TextInputRef.current?.isFocused()) {
      return unFocusInput();
    }
    Animated.spring(inputXPosition, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    TextInputRef.current?.focus();
  };

  const ListHeader = () => (
    <View style={styles.listHeader}>
      {[
        '',
        'New Confirmed',
        'New Deaths',
        'New Recovered',
        'Total Confirmed',
        'Total Deaths',
        'Total Recovered',
      ].map(ele => (
        <ListHeaderButton key={ele} title={ele} />
      ))}
    </View>
  );
  const ListHeaderButton = ({title = ''}) => {
    const key = title.replace(' ', '');
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          if (!title) {
            return;
          }
          LayoutAnimation.easeInEaseOut();
          //@ts-ignore
          setSortBy(prev => ({
            sort:
              key !== prev.name ? 'desc' : prev.sort === 'asc' ? 'desc' : 'asc',
            name: key,
          }));
        }}
        style={styles.headerCell}>
        <CustomText adjustsFontSizeToFit={true} numberOfLines={2} type="h6">
          {title}{' '}
        </CustomText>
        {sortBy.name && sortBy.name === key ? (
          <AntDesign
            name={sortBy.sort === 'asc' ? 'caretup' : 'caretdown'}
            size={responsiveFontSize(1.4)}
            color={themeColors.card}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <CustomText type="h2">Countries</CustomText>
        <TouchableOpacity onPress={focusInput}>
          <AntDesign
            name={'search1'}
            color={themeColors.primary}
            size={responsiveFontSize(4)}
          />
          {!!searchText && (
            <AntDesign
              name="infocirlce"
              style={styles.hintIcon}
              color={themeColors.notification}
              size={responsiveFontSize(3)}
            />
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData || []}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        renderItem={CountryItem}
        ListEmptyComponent={EmptyData}
        keyExtractor={(item, index) => item.CountryCode + '_' + index}
        initialNumToRender={10}
        maxToRenderPerBatch={4}
        windowSize={1}
        contentContainerStyle={styles.list}
      />
      <Animated.View
        style={[
          styles.textInputSearchContainer,
          {
            transform: [{translateX: inputXPosition}],
          },
        ]}>
        <TextInput
          //@ts-ignore
          ref={TextInputRef}
          style={[styles.textInput]}
          onBlur={unFocusInput}
          value={searchText}
          onChangeText={v => setSearchText(v.toLowerCase())}
          placeholderTextColor={themeColors.text}
          placeholder={'Country Name'}
        />
        <TouchableOpacity onPress={unFocusInput}>
          <AntDesign
            name="close"
            color={themeColors.primary}
            size={responsiveFontSize(4)}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const screenPaddingTop = deviceInfoModule.hasNotch() ? 30 : 8;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: screenPaddingTop,
  },
  headerStyle: {
    padding: 8,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputSearchContainer: {
    position: 'absolute',
    paddingTop: screenPaddingTop + 8,
    paddingHorizontal: 8,
    paddingBottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 26,
    width: responsiveWidth(80),
    textAlign: 'left',
    backgroundColor: themeColors.background,
    color: themeColors.text,
    borderColor: themeColors.primary,
  },
  hintIcon: {position: 'absolute', top: -8, right: -8},
  list: {paddingBottom: 50},
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: themeColors.background,
    paddingBottom: 8,
  },
  headerCell: {
    width: responsiveWidth(100 / 7),
    paddingLeft: 4,
  },
});
