import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import TabBar from "../../components/tabBar";
import HomeHeader from "../../components/homeHeader";

export default function _layout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ header: () => <HomeHeader title={"Home"}/> }} />
      <Tabs.Screen name="report" options={{ header: () => <HomeHeader title={"Report"}/> }} />
      <Tabs.Screen name="profile" options={{ header: () => <HomeHeader title={"Profile"}/> }} />
    </Tabs>
  );
}
