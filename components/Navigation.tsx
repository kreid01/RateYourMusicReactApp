import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "native-base";
import { RegisterScreen } from "../screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { navStyles } from "../styles/BottomNavStyles";
import { TabArr } from "./TabArr";
import { SingleReleaseScreen } from "../screens/SingleReleaseScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { createClient, Provider } from "urql";
import { getAccessToken } from "../utils/accessToken";
import { SingleChannelScreen } from "../screens/SingleChannelScreen";
import { PlaylistScreen } from "../screens/PlaylistScreen";

export const urqlClient = createClient({
  url: "http://192.168.0.120:80/graphql",
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const Icon = ({ type, name, color, size = 24, style }: any) => {
    const fontSize = 24;
    const Tag = type;
    return (
      <>
        {type && name && (
          <Tag
            name={name}
            size={size || fontSize}
            color={color}
            style={style}
          />
        )}
      </>
    );
  };

  const TabButton = (props: any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef<any>(null);
    const textRef = useRef<any>(null);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={navStyles.container}
      >
        <Animatable.View
          ref={viewRef}
          duration={400}
          style={navStyles.container}
        >
          <View className="relative" style={navStyles.btn}>
            <Icon type={item.type} name={item.icon} color={"white"} />
            {focused ? (
              <View className="absolute border-[1px] border-white -top-[11px] w-14 rounded-md z-10"></View>
            ) : null}
          </View>
          <Animatable.Text ref={textRef} style={navStyles.text}>
            {item.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  const Root = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: navStyles.tabBar,
        }}
        initialRouteName="Home"
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    );
  };

  return (
    <Provider value={urqlClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Back" component={Root} />

          <Stack.Screen
            name="Release"
            component={SingleReleaseScreen}
          ></Stack.Screen>

          <Stack.Screen
            name="Channel"
            component={SingleChannelScreen}
          ></Stack.Screen>

          <Stack.Screen
            name="Playlist"
            component={PlaylistScreen}
          ></Stack.Screen>

          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: "#0ea5e9",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            name="Registration"
            component={RegisterScreen}
          ></Stack.Screen>
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: "#0ea5e9",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            name="Login"
            component={LoginScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
