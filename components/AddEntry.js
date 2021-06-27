import React, { useState } from "react";
import { View } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";

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

  const metaInfo = getMetricMetaInfo();

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map(key => {
        const { getIcon, type, ...rest } = metaInfo[key];
        let value = state[key];

        return (
          <View key={key}>
            {getIcon()}
            {type === "slider" ? (
              <UdaciSlider
                value={value}
                onChange={value => slide(key, value)}
                {...rest}
              />
            ) : (
              <UdaciSteppers
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
                {...rest}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default AddEntry;
