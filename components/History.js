import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { receiveEntries, addEntry } from "../actions";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import { fetchCalendarResults } from "../utils/api";
import UdaciFitnessCalendar from "udacifitness-calendar";
import { white } from "../utils/colors";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";
import AppLoading from 'expo-app-loading'

const History = props => {
  const [ready, setReady] = useState(false);

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
      })
      .then(() => setReady(true));
    // .then(() => this.setState(() => ({ ready: true })));
  }, []);

  const renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View>
      {today ? (
        <View>
          <DateHeader date={formattedDate} />
          <Text style={styles.noDataText}>{today}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => console.log("Pressed!")}>
          <MetricCard date={formattedDate} metrics={metrics} />
        </TouchableOpacity>
      )}
    </View>
  );

  renderEmptyDate = formattedDate => {
    <View style={styles.item}>
      <DateHeader date={formattedDate} />
      <Text style={styles.noDataText}>
        You didn't log any data on this day.
      </Text>
    </View>;
  };

  const { entries } = props;

  if (ready === false) {
    return <AppLoading />;
  }

  return (
    <UdaciFitnessCalendar
      items={entries}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

function mapStateToProps(entries) {
  return {
    entries
  };
}

export default connect(mapStateToProps)(History);
