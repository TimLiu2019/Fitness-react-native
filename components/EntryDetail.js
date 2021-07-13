import React, { useEffect } from "react";
import { View, Text } from "react-native";

const EntryDetail = props => {
  useEffect(() => {
    const { entryId } = props.route.params;
    setTitle(entryId);
  }, []);

  setTitle = entryId => {
    if (!entryId) return;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    props.navigation.setOptions({
      title: `${month}/${day}/${year}`
    });
  };

  return (
    <View>
      <Text>Entry Detail - {JSON.stringify(props.route.params.entryId)}</Text>
    </View>
  );
};

export default EntryDetail;
