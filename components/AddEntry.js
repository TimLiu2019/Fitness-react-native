import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import produce from "immer";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  );
}

const AddEntry = props => {
  const [state, setState] = useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  });

  submit = () => {
    const key = timeToString();
    const entry = state;

    // Update Redux

    setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }));

    // Navigate to home

    // Save to "DB"

    // Clear local notification
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    setState(
      produce(draft => {
        draft[metric] = draft[metric] > max ? max : draft[metric] + step;
      })
    );
  };

  decrement = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    setState(
      produce(draft => {
        draft[metric] = draft[metric] - step;
      })
    );
  };

  slide = (metric, value) => {
    setState(
      produce(draft => {
        draft[metric] = value;
      })
    );
  };

  reset = () => {
    const key = timeToString();
  };
  const metaInfo = getMetricMetaInfo();
  if (props.alreadyLogged) {
    return (
      <View>
        <Text>You already logged your information for today.</Text>
        <Ionicons name={"ios-happy"} size={100} />
        <TextButton onPress={this.reset}>Reset</TextButton>
      </View>
    );
  }

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      <Text>{JSON.stringify(state)}</Text>
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
      <SubmitBtn onPress={submit} />
    </View>
  );
};

export default AddEntry;
