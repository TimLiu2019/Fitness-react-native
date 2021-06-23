import React from "react";
import { View } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";

const AddEntry = () => {
  return <View>{getMetricMetaInfo("bike").getIcon()}</View>;
};

export default AddEntry;
