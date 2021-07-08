import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/api";
import UdaciFitnessCalendar from "udacifitness-calendar";

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

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View>
      {today ? (
        <Text>{JSON.stringify(today)}</Text>
      ) : (
        <Text>{JSON.stringify(metrics)}</Text>
      )}
    </View>
  );

  renderEmptyDate = () => {
    <View>
      <Text>No Data for this day</Text>
    </View>;
  };

  const { entries } = props;

  return (
    <UdaciFitnessCalendar
      items={entries}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
};

function mapStateToProps(entries) {
  return {
    entries
  };
}

export default connect(mapStateToProps)(History);
