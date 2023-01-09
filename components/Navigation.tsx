import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { InfoIcon, View } from "native-base";
import { RegisterScreen } from "../screens/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import { navStyles } from "../styles/BottomNavStyles";
import { TabArr } from "./TabArr/TabArr";
import { SingleReleaseScreen } from "../screens/SingleReleaseScreen";
import { LoginScreen } from "../screens/LoginScreen";
import {
  createClient,
  defaultExchanges,
  gql,
  Provider,
  subscriptionExchange,
} from "urql";
import { getAccessToken } from "../utils/accessToken";
import { SingleChannelScreen } from "../screens/SingleChannelScreen";
import { PlaylistScreen } from "../screens/PlaylistScreen";
import { createClient as createWSClient } from "graphql-ws";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";

const wsClient = createWSClient({
  url: "ws://192.168.0.15:80/graphql",
});

export const urqlClient = createClient({
  url: "http://192.168.0.15:80/graphql",
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
  exchanges: [
    devtoolsExchange,
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
    cacheExchange({
      updates: {
        Mutation: {
          deleteMessage(_result, args, cache, _info) {
            const Messages = gql`
              query getChatMessages($id: Int!) {
                (id: $id) {
                  id
                  channelId
                  posterId
                  content
                  postDate
                }
              }
            `;

            const fields = cache
              .inspectFields("Query")
              .filter((field) => field.fieldName === "getChatMessages")
              .forEach((field) => {
                cache.updateQuery(
                  {
                    query: Messages,
                    variables: { id: 1 },
                  },
                  (data) => {
                    data.getChatMessages = data.getChatMessages.filter(
                      (message: any) => message.id !== args.id
                    );
                    return data;
                  }
                );
              });
          },
        },
      },
    }),
  ],
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

  const [selected, setSelected] = useState(1);

  const TabButton = (props: any) => {
    const { item, onPress, accessibilityState, index } = props;
    const focused = accessibilityState.selected;

    useEffect(() => {
      if (focused) setSelected(index + 1);
    }, [focused]);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={navStyles.container}
      >
        <Animatable.View style={navStyles.container}>
          <View className="relative" style={navStyles.btn}>
            <Icon type={item.type} name={item.icon} color={"white"} />
          </View>
          <Animatable.Text style={navStyles.text}>{item.label}</Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  const left = useState(new Animated.Value(0))[0];

  Animated.timing(left, {
    toValue:
      selected === 1
        ? 5
        : selected === 2
        ? 85
        : selected === 3
        ? 170
        : selected === 4
        ? 250
        : 335,
    duration: 700,
    useNativeDriver: true,
  }).start();

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
                tabBarButton: (props) => (
                  <Fragment>
                    <Animated.View
                      style={{ transform: [{ translateX: left }] }}
                      className="absolute border-[1px] border-white -top-[0px] left-[10px]
                     w-14 rounded-md z-10"
                    ></Animated.View>
                    <TabButton {...props} index={index} item={item} />
                  </Fragment>
                ),
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
