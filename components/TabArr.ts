import { Icons } from "./Icons";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { CreateReleaseScreen } from "../screens/CreateReleaseScreen";
import { ChannelScreen } from "../screens/ChannelScreen";

export const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: HomeScreen,
  },
  {
    route: "Channels",
    label: "Channels",
    type: Icons.Feather,
    icon: "globe",
    component: ChannelScreen,
  },
  {
    route: "Add",
    label: "Add",
    type: Icons.Feather,
    icon: "plus-square",
    component: CreateReleaseScreen,
  },
  {
    route: "Like",
    label: "Like",
    type: Icons.Feather,
    icon: "heart",
    component: HomeScreen,
  },
  {
    route: "Account",
    label: "Account",
    type: Icons.FontAwesome,
    icon: "user-circle-o",
    component: LoginScreen,
  },
];
