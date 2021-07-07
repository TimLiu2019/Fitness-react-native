import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import produce from "immer";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "../utils/api";
import { connect } from "react-redux";
import { addEntry } from "../actions";
import { purple, white } from "../utils/colors";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
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
    props.dispatch(
      addEntry({
        [key]: entry
      })
    );

    setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }));

    // Navigate to home

    // Save to "DB"
    submitEntry({ key, entry });

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

    // update Redux
    props.dispatch(
      addEntry({
        [key]: getDailyReminderValue()
      })
    );

    removeEntry(key);
  };
  const metaInfo = getMetricMetaInfo();
  if (props.alreadyLogged) {
    return (
      <View style={styles.center}>
        <Text>You already logged your information for today.</Text>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-happy-outline" : "md-happy"}
          size={100}
        />
        <TextButton style={{ padding: 10 }} onPress={this.reset}>
          Reset
        </TextButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(metaInfo).map(key => {
        const { getIcon, type, ...rest } = metaInfo[key];
        let value = state[key];
        return (
          <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
  }
});

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined"
  };
}

export default connect(mapStateToProps)(AddEntry);
