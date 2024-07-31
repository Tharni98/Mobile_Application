import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../components/loading";
import CustomKeyboardView from "../components/customKeyboardView";

export default function UpdateData({ dbUser }) {
  const [loading, setLoading] = useState(false);

  const ageRef = useRef("");
  const contactRef = useRef("");

  const id = dbUser._id;

  const updateUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://incident-report-app-backend.vercel.app/profile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: ageRef.current,
            contactNum: contactRef.current,
          }),
        }
      );

      const result = await response.json();

      if (response.status === 201) {
        setLoading(false);
        Alert.alert("Profile", "Profile Updated!");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Profile", "Error Updating Profile!");
      //   console.error("Error updating document:", error);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{}} className="flex-1 gap-12 pb-20">
        <View className="gap-5">
          <Text
            style={{ fontSize: hp(3) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Update Data
          </Text>
          {/* inputs */}
          <View className="gap-4">
            <View
              style={{ height: hp(7), width: wp(70) }}
              className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
            >
              <AntDesign name="form" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (ageRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Age"
                placeholderTextColor={"gray"}
                cursorColor={"gray"}
              />
            </View>

            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
              >
                <AntDesign name="form" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (contactRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Contact Number"
                  placeholderTextColor={"gray"}
                  cursorColor={"gray"}
                />
              </View>
            </View>

            {/* submit button */}

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={updateUser}
                  style={styles.touchableOpacity}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: "#6366F1", // Tailwind's indigo-500 color
    justifyContent: "center",
    alignItems: "center",
    height: hp(6.5),
    borderRadius: hp(3) / 2,
  },
});
