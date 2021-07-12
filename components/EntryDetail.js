import React from "react";
import { View, Text } from "react-native";

const EntryDetail = props => {
  return (
    <View>
      <Text>Entry Detail - {JSON.stringify(props.route.params.entryId)}</Text>
    </View>
  );
};

export default EntryDetail;
