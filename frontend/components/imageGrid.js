import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./imageCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ImageGrid = ({ currentTab, router }) => {
  const data = [
    "Investment",
    "Home Insurance",
    "Vehicle Insurance",
    "Health Insurance",
    "Life Insurance",
    "Mortgage",
  ];

  const dataObj = {
    personal: [
      "Investment",
      "Home Insurance",
      "Vehicle Insurance",
      "Health Insurance",
      "Life Insurance",
      "Mortgage",
    ],
    business: ["Property", "Marine", "Employee Related", "Motor"],
  };

  const dataImage = [
    "../assets/images/save-money.png",
    "../assets/images/home-insurance.png",
    "../assets/images/car-insurance.png",
    "../assets/images/care.png",
    "../assets/images/healthcare.png",
    "../assets/images/mortgage.png",
  ];

  const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

  const getColumnCount = () => {
    if (deviceWidth > +1024) {
      // desktop
      return 4;
    } else if (deviceWidth >= 768) {
      // tablet
      return 3;
    } else {
      // mobile
      return 2;
    }
  };

  const currentTabData = () => {
    switch (currentTab) {
      case "Personal":
        return dataObj.personal;
      case "Business":
        return dataObj.business;
      default:
        return dataObj.personal;
    }
  };

  const columns = getColumnCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={currentTabData()}
        numColumns={columns}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard
            router={router}
            item={item}
            columns={columns}
            index={index}
            imagePath={dataImage[index]}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});

export default ImageGrid;
