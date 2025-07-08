import { VictoryAxis, VictoryChart, VictoryLine } from "victory-native";
import { useWindowDimensions } from "react-native";

export default function PriceChart({ ticks }) {
  const { width } = useWindowDimensions();

  const data =
    ticks?.slice().reverse().map((t, i) => ({ x: i, y: t.price })) ?? [];

  return (
    <VictoryChart
      height={180}
      width={width - 16}
      padding={{ top: 10, bottom: 30, left: 50, right: 20 }}
    >
       <VictoryAxis
        style={{
          axis: { stroke: "#666" },
          ticks: { stroke: "#666", size: 4 },
          tickLabels: { fill: "#888", fontSize: 10 },
          grid: { stroke: "transparent" },
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          axis: { stroke: "#666" },
          ticks: { stroke: "#666", size: 4 },
          tickLabels: { fill: "#888", fontSize: 10 },
          grid: { stroke: "#333", strokeDasharray: "4,4" },
        }}
      />
      <VictoryLine
      style={{
          data: {
            stroke: "#00e676",       
            strokeWidth: 2,
          },
        }}
        data={data}
        interpolation="monotoneX"
      />
    </VictoryChart>
  );
}
