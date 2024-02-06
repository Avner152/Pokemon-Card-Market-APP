import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import pokemon from "pokemontcgsdk";
import { useEffect, useState } from "react";
import SetItem from "./SetItem";
import myStore from "../MobX/Store";

const Sets = () => {
  const [loading, setLoading] = useState(false);

  const sortByDate = (a, b) => {
    const [yearA, monthA, dayA] = a.releaseDate.split("/");
    const [yearB, monthB, dayB] = b.releaseDate.split("/");
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return new Date(dateA) - new Date(dateB);
  };

  pokemon.configure({ apiKey: "726a711a-7e33-48af-b379-225f67d6b589" });

  useEffect(() => {
    if (!myStore.sets.length) {
      setLoading(true);
      pokemon.set.all({}).then((sets) => {
        // setSets();
        myStore.updateSets(sets.sort(sortByDate));
        setLoading(false);
      });
    }
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.row}>
          {myStore.sets.map((set, k) => (
            <SetItem key={k} set={set} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default Sets;
