import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import EntryDetail from "./components/EntryDetail";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { purple, white } from "./utils/colors";
import Live from './components/Live'

export default function App() {
  function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    );
  }

  const Tabs =
    Platform.OS === "ios"
      ? createBottomTabNavigator()
      : createMaterialTopTabNavigator();

  const TabNav = () => (
    <Tabs.Navigator
      initialRouteName="AddEntry"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Add Entry") {
            icon = <FontAwesome name="plus-square" size={size} color={color} />;
          } else if (route.name === "History") {
            icon = <Ionicons name="ios-bookmarks" size={size} color={color} />;
          }else if (route.name === "Live") {
            icon = <Ionicons name="ios-speedometer" size={size} color={color} />;
          }
          
          return icon;
        }
      })}
      tabBarOptions={{
        header: null,
        activeTintColor: Platform.OS === "ios" ? purple : white,
        showIcon: true,
        style: {
          height: 80,
          backgroundColor: Platform.OS === "ios" ? white : purple,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}
    >
      <Tabs.Screen name="Add Entry" component={AddEntry} />
      <Tabs.Screen name="History" component={History} />
      <Tabs.Screen name="Live" component={Live} />
    </Tabs.Navigator>
  );
  const Stack = createStackNavigator();

  const MainNav = () => (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={TabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EntryDetail"
        component={EntryDetail}
        options={{
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple
          }
        }}
      />
    </Stack.Navigator>
  );

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNav />
        </NavigationContainer>
      </View>
    </Provider>
  );
}
