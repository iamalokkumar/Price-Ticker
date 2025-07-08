import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import useBinanceTicker from "../src/hooks/useBinanceTicker";
import PriceCard from "../src/components/PriceCard";
import PriceChart from "../src/components/PriceChart";
export default function Index() {
  const { ticks, trendUp, latest } = useBinanceTicker();
  
  return (
   <SafeAreaView style={styles.container}>
      <Text style={styles.header}>BTC / USDT</Text>

      <PriceChart ticks={ticks || []} />

      <FlatList
        data={ticks}
        keyExtractor={(item) => item.time.toISOString()}
        renderItem={({ item, index }) => (
          <PriceCard
            price={item.price}
            time={item.time}
            trendUp={index === 0 ? trendUp : ticks[index - 1].price <= item.price}
          />
        )}
        ListEmptyComponent={<Text style={styles.loading}>Connecting…</Text>}
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 8 },
  header: { color: "white", fontSize: 28, fontWeight: "700", marginBottom: 8 },
  loading: { color: "#777", textAlign: "center", marginTop: 20 },
});