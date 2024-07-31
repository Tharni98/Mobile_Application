import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useAuth } from "../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../../utils/common";
import axios from "axios";
import UpdateData from "../../components/updateData";

const ios = Platform.OS === "ios";

export default function Profile() {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [dbUser, setDbUser] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://incident-report-app-backend.vercel.app/profile"
      );
      setData(response.data);

      let foundUser = null;

      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].profileUrl === user.profileUrl) {
          foundUser = response.data[i];
          setDbUser(foundUser);
          break;
        }
      }
    } catch (error) {
      // console.log("Error fetching data: ", error);
      Alert.alert("Error", "An error occurred while fetching data!");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={200} // Adjust keyboard offset
    >
      <ScrollView
        style={{ flex: 1, paddingBottom: hp(30) }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center pt-8">
          <Image
            style={{ height: hp(12), aspectRatio: 1, borderRadius: 100 }}
            source={user?.profileUrl ? { uri: user.profileUrl } : blurhash}
          />
          <View className="flex-1 px-5 py-5">
            <View style={styles.container} className="bg-indigo-300 px-4 py-4">
              <Text className="text-3xl font-bold text-center">
                {user?.username}
              </Text>
              <View className="flex-1 justify-center items-center gap-3">
                <View className="flex-row">
                  <Text className="text-lg font-semibold text-center">
                    Email :{" "}
                  </Text>
                  <Text className="text-lg font-semibold text-center">
                    {dbUser?.email}
                  </Text>
                </View>
                <View className="flex-row">
                  <Text className="text-lg font-semibold text-center">
                    Age :{" "}
                  </Text>
                  <Text className="text-lg font-semibold text-center">
                    {dbUser?.age ? dbUser.age : "Not provided"}
                  </Text>
                </View>
                <View className="flex-row">
                  <Text className="text-lg font-semibold text-center">
                    Contact Number :{" "}
                  </Text>
                  <Text className="text-lg font-semibold text-center">
                    {dbUser?.contactNum ? dbUser.contactNum : "Not provided"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <UpdateData dbUser={dbUser} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: hp(1),
    paddingBottom: hp(13),
  },
  container: {
    height: hp(20),
    width: wp(90),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
  },
  text: {
    fontSize: hp(2.5),
    fontWeight: "bold",
  },
});
