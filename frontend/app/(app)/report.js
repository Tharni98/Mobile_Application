import { View, Text, Platform, KeyboardAvoidingView, ScrollView, Keyboard } from "react-native";
import React from "react";
import ReportComponent from "../../components/reportComponent";

const ios = Platform.OS === "ios";

export default function Report() {

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={150} // Adjust keyboard offset
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <ReportComponent />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
