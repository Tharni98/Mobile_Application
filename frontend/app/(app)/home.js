import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import Carousel from "../../components/carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TabScreen from "../../components/tabScreen";
import ImageGrid from "../../components/imageGrid";

export default function Home() {
  const [tab, setTab] = useState(undefined);

  const updatedTab = (tab) => {
    setTab(tab);
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Carousel />

      <View className="flex-1 px-5 py-5">
        <View style={styles.container} className="bg-violet-300 px-4 py-4">
          <Text className="text-2xl font-medium">My Policy Details</Text>

          <View className="flex-1 justify-center items-center gap-2 py-2">
            <View style={styles.policies} className="flex-row gap-2 bg-white">
              <Text className="text-xl font-normal">Life Policy</Text>
              <Text className="text-base font-normal">187524932</Text>
            </View>

            <View style={styles.policies} className="flex-row gap-2 bg-white">
              <Text className="text-xl font-normal">Motor Policy</Text>
              <Text className="text-base font-normal">187524932</Text>
            </View>
          </View>

          <View className="flex right-1">
            <Text className="font-medium text-right">see more...</Text>
          </View>
        </View>
      </View>

      <TabScreen updatedTab={updatedTab} />

      <ImageGrid currentTab={tab} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: hp(1),
    paddingBottom: hp(13),
  },
  container: {
    height: hp(20),
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "white",
  },
  text: {
    fontSize: hp(2.5),
    fontWeight: "bold",
  },
  policies: {
    padding: 2,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: wp(80),
    height: hp(4),
    borderCurve: "continuous",
  },
});

// style={styles.policies}
