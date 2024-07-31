import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import Loading from "./loading";

export default function ReportComponent() {
  const [loading, setLoading] = useState(false);

  const subjectRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const locationRef = useRef("");
  const propertyTypeRef = useRef("");
  const vehicleNumberRef = useRef("");
  const propertyAddressRef = useRef("");
  const descriptionRef = useRef("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const createDbReport = async () => {
    if (
      !subjectRef.current ||
      !dateRef.current ||
      !timeRef.current ||
      !locationRef.current ||
      !propertyTypeRef.current ||
      !vehicleNumberRef.current ||
      !propertyAddressRef.current ||
      !descriptionRef.current
    ) {
      Alert.alert("Incident Report", "Please fill all the fields!");
      return;
    }

    // Construct the data object
    const data = {
      subject: subjectRef.current,
      date: dateRef.current,
      time: timeRef.current,
      location: locationRef.current,
      propertyType: propertyTypeRef.current,
      vehicleNumber: vehicleNumberRef.current,
      propertyAddress: propertyAddressRef.current,
      description: descriptionRef.current,
    };
    setLoading(true);

    // Send the data to the backend
    try {
      const response = await fetch(
        "https://incident-report-app-backend.vercel.app/report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.status === 201) {
        Alert.alert("Incident Report", "Report Submitted!");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Incident Report", "Error Creating document!");
      // console.error("Error creating document:", error);
    }
  };

  return (
    <View className="pb-40">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Incident Report
          </Text>

          {/* inputs */}
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
            >
              <AntDesign name="form" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (subjectRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Incident Subject"
                placeholderTextColor={"gray"}
                cursorColor={"gray"}
              />
            </View>
            <View
              className="flex-row justify-between"
              style={{ height: hp(7), width: wp(90) }}
            >
              <View
                style={{ height: hp(7), width: wp(43) }}
                className="flex-row gap-4 px-2 bg-neutral-300 items-center rounded-2xl"
              >
                {/* <AntDesign name="form" size={hp(2.7)} color="gray" /> */}
                <TextInput
                  onChangeText={(value) => (dateRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700 text-center"
                  placeholder="Date (DD/MM/YYYY)"
                  placeholderTextColor={"gray"}
                  cursorColor={"gray"}
                />
              </View>
              <View
                style={{ height: hp(7), width: wp(43) }}
                className="flex-row gap-4 px-2 bg-neutral-300 items-center rounded-2xl"
              >
                {/* <AntDesign name="form" size={hp(2.7)} color="gray" /> */}
                <TextInput
                  onChangeText={(value) => (timeRef.current = value)}
                  style={{ fontSize: hp(2), height: hp(3) }}
                  className="flex-1 font-semibold text-neutral-700 text-center"
                  placeholder="Time (HH:MM AM/PM)"
                  placeholderTextColor={"gray"}
                  cursorColor={"gray"}
                />
              </View>
            </View>

            {/* <Pressable onPress={showDateDatePicker}>
              <Text>Date</Text>
            </Pressable>

            {showDate && <RNDateTimePicker value={date} mode="date" onChange={onChangeDate}/>}

            <Pressable onPress={showTimeDatePicker}>
              <Text>Time</Text>
            </Pressable>

            {showTime && <RNDateTimePicker value={time} mode="time" onChange={onChangeTime}/>} */}

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
            >
              <AntDesign name="form" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (locationRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Location"
                placeholderTextColor={"gray"}
                cursorColor={"gray"}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
            >
              <AntDesign name="form" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (propertyTypeRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Property Type"
                placeholderTextColor={"gray"}
                cursorColor={"gray"}
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
            >
              <AntDesign name="form" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (vehicleNumberRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Vehicle Number(In case of a Vehicle)"
                placeholderTextColor={"gray"}
                cursorColor={"gray"}
              />
            </View>

            <View className="gap-4">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
              >
                <AntDesign name="form" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (propertyAddressRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Property Address(In case of a Property)"
                  placeholderTextColor={"gray"}
                  cursorColor={"gray"}
                />
              </View>

              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-300 items-center rounded-2xl"
              >
                <AntDesign name="form" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (descriptionRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Description of the Incident"
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
                  onPress={createDbReport}
                  style={styles.touchableOpacity}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Report
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
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
