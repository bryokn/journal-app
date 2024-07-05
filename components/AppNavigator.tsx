import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@/components/Home';
import { LoginScreen } from '@/components/Login';
import { RegisterScreen } from '@/components/Register';
import { JournalScreen } from '@/components/Journal';
import { CategoriesScreen } from '@/components/Categories';
import { SummaryScreen } from '@/components/Summary';
import { SettingsScreen } from '@/components/Settings';

const Stack = createStackNavigator();

function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Journal" component={JournalScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;