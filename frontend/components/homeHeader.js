import { View, Text, Platform } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "../context/authContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./customMenuItems";
import { AntDesign, Feather } from "@expo/vector-icons";

const ios = Platform.OS === "ios";

export default function HomeHeader({title}) {
  const { top } = useSafeAreaInsets();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-5 bg-indigo-500 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text style={{ fontSize: hp(5) }} className="font-bold text-white">
          {title}
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl ? { uri: user.profileUrl } : blurhash}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                marginTop: 40,
                marginLeft: -0,
                shadowOpacity: 0.1,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                width: 160,
                height: 50,
                justifyContent: 'center',
              }
            }}
          >
            <MenuItem 
              text='Sign Out'
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
