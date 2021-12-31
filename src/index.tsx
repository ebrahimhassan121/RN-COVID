import React from 'react';
import {
  navigationRoutesDefaultOptions,
  navigationRoutesNames,
} from '@src/utils/navigators';
import Home from '@src/screens/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {themeColors} from './styles/common';
import Countries from './screens/countries/Countries';
const Stack = createStackNavigator();
function MainNavigation() {
  return (
    <>
      <NavigationContainer theme={{dark: true, colors: themeColors}}>
        <Stack.Navigator>
          <Stack.Screen
            name={navigationRoutesNames.home.name}
            component={Home}
            options={navigationRoutesDefaultOptions}
          />
          <Stack.Screen
            name={navigationRoutesNames.countries.name}
            component={Countries}
            options={navigationRoutesDefaultOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
export default MainNavigation;
