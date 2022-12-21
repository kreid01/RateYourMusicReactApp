import { Icons } from "../components/Icons";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";

export const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: HomeScreen,
  },
  {
    route: "Search",
    label: "Search",
    type: Icons.Feather,
    icon: "search",
    component: HomeScreen,
  },
  {
    route: "Add",
    label: "Add",
    type: Icons.Feather,
    icon: "plus-square",
    component: HomeScreen,
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
