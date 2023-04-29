import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ROUTES} from '../constants/routeNames';
import HomeScreen from '../screens/HomeScreen';
import PdfDetailsScreen from '../screens/PdfDetailsScreen';
import SplashScreen from '../screens/SplashScreen';

// Screens

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const getUserToken = async () => {
    // testing purposes
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    try {
      setIsLoading(true);
      // custom logic
      await sleep(2000);
      const token = null;
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);

    getUserToken();
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* {userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name={ROUTES.SCREENS.LOGIN}
            component={SimpleSignInScreen}
            options={{
              title: strings.HOME_welcome,
            }}
            initialParams={{setUserToken}}
          />
        ) : ( */}
        <Stack.Screen name={ROUTES.SCREENS.HOME} component={HomeScreen} />
        <Stack.Screen
          name={ROUTES.SCREENS.PDF_READER}
          component={PdfDetailsScreen}
        />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
