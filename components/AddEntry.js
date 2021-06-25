import React, { useState } from "react";
import { View } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";

const AddEntry = () => {
  const [state, setState] = useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  });

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    setState(state => ({
      [metric]: state[metric] > max ? max : state[metric] + step
    }));
  };

  decrement = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    setState(state => ({
      [metric]: state[metric] > max ? max : state[metric] - step
    }));
  };

  slide = (metric, value) => {
    setState(() => ({
      [metric]: value
    }));
  };

  return <View>{getMetricMetaInfo("bike").getIcon()}</View>;
};

export default AddEntry;
