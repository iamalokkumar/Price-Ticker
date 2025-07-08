import { View, Text, StyleSheet } from "react-native";

export default function PriceCard({ price, time, trendUp }) {
  return (
    <View style={[styles.card, trendUp ? styles.up : styles.down]}>
      <Text style={styles.price}>
        {price.toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </Text>
      <Text style={styles.time}>
        {time.toLocaleTimeString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
  },
  price: { fontSize: 20, fontWeight: "600", color: "white" },
  time:  { fontSize: 12, color: "#aaa" },
  up:   { borderLeftWidth: 4, borderLeftColor: "green" },
  down: { borderLeftWidth: 4, borderLeftColor: "red" },
});
