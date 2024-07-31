import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function TabScreen({ updatedTab }) {
  const sendCurrentTab = (tab) => {
    updatedTab(tab);
  };

  const button = [
    {
      title: "Personal",
    },
    {
      title: "Business",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(button[0].title);

  const handleButton = (index) => {
    setSelectedTab(button[index].title);
    sendCurrentTab(button[index].title);
  };

  return (
    <View className="px-5">
      <View />
      <View
        className="flex-row gap-5 bg-indigo-400"
        style={{ height: hp(6), borderRadius: 10 }}
      >
        {button.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleButton(index)}
            style={{ flex: 1 }}
            className="py-2 justify-center items-center"
          >
            <TabButton
              key={index}
              {...item}
              selectedTab={selectedTab}
              index={index}
              handleButton={handleButton}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const TabButton = ({ title, selectedTab }) => {
  return (
    <Text
      style={{ width: wp(40), height: hp(4.8) }}
      className={`text-2xl text-center align-middle px-2 ${
        selectedTab === title ? "text-indigo-400" : "text-white"
      } ${selectedTab === title ? "bg-white" : "bg-indigo-400"}
      rounded-lg`}
    >
      {title}
    </Text>
  );
};
