import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Spinner, View } from "native-base";
import { RegisterScreen } from "../screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { navStyles } from "../styles/BottomNavStyles";
import { TabArr } from "./TabArr";
import { Provider } from "react-redux";
import store from "../store/store";
import { setRefreshToken } from "../utils/refreshToken";
import { setAccessToken } from "../utils/accessToken";
import { SingleReleaseScreen } from "../screens/SingleReleaseScreen";
import { LoginScreen } from "../screens/LoginScreen";

export const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    fetch("http://192.168.0.120:80/auth", {
      method: "POST",
      credentials: "include",
      headers: {
        "x-forwarded-proto": "https",
      },
    })
      .then(async (x) => {
        const { refreshToken, accessToken } = await x.json();
        setRefreshToken(refreshToken);
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

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

    useEffect(() => {
      if (focused) {
      } else {
      }
    }, [focused]);

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
              <View className="absolute border-[2px] border-white -top-[11px] w-24 rounded-md z-10"></View>
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

  const [loading, setLoading] = useState(true);

  return !loading ? (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Back" component={Root} />
          <Stack.Screen
            name="Release"
            component={SingleReleaseScreen}
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
  ) : (
    <Spinner />
  );
};
