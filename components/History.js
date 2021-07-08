import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/api";

const History = props => {
  const { dispatch } = props;
  useEffect(() => {
    fetchCalendarResults()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString()]: getDailyReminderValue()
            })
          );
        }
      });
    // .then(() => this.setState(() => ({ ready: true })));
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
};

function mapStateToProps(entries) {
  return {
    entries
  };
}

export default connect(mapStateToProps)(History);
