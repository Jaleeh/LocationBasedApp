import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from '../app/screens/Register';
import Login from '../app/screens/Login';
import Map from '../app/screens/Map';
import SplashScreen from '../app/screens/Splash';
import useAuth from '../app/hooks/useAuth';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const {isAuthenticated, splashScreen} = useAuth();

  if (splashScreen) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Login">
        {isAuthenticated ? (
          <HomeStack.Screen
            name="Map"
            component={Map}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <HomeStack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <HomeStack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </>
        )}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStackNavigator;
