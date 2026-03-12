import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default {
  signIn: <Feather name="user" size={28} color="black" />,
  showPassword: <Feather name="eye" size={24} color="black" />,

  dontShowPassword: <Feather name="eye-off" size={24} color="black" />,

  backArrow: <Ionicons name="chevron-back" size={24} color="black" />,

  shoppingCart: <AntDesign name="shoppingcart" size={28} color="black" />,

  star: <AntDesign name="staro" size={35} color="black" />,
  shoppingBag: <Ionicons name="bag-outline" size={35} color="black" />,
  contactUs: (
    <MaterialCommunityIcons name="cellphone-message" size={30} color="black" />
  ),
  homeFooder: <Ionicons name="home-outline" size={30} color="black" />,

  trashcan: <Feather name="trash" size={19} color="black" />,

  receipt: <MaterialIcons name="receipt-long" size={30} color="black" />,
  settings: <Ionicons name="settings-outline" size={28} color={"black"} />,
  
  // Settings screen icons
  darkMode: <MaterialCommunityIcons name="theme-light-dark" size={24} color="#555" />,
  notifications: <MaterialCommunityIcons name="bell" size={24} color="#555" />,
  logout: <MaterialCommunityIcons name="logout" size={24} color="#fff" />,
};
