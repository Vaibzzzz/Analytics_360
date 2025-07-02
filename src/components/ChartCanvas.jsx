import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ChartCard from "./ChartCard";

function ChartCanvas({ charts, setCharts }) {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.FIELD,
    drop: async (item) => {
      console.log("Dropped item:", item);

      const payload = {
        xField: item.name,
        yField: "L3M_Month", // make sure y axis isnt hard corded
        aggregation: "sum",
        chartType: "bar",
      };

      try {
        const res = await axios.post("http://localhost:8000/chart", payload);
        const newChart = {
          id: uuidv4(),
          xAxis: res.data.xAxis,
          yAxis: res.data.yAxis,
          series: res.data.series,
        };

        setCharts(prev => [...prev, newChart]);
      } catch (err) {
        console.error("Chart API error:", err);
      }
    },
  }));

  return (
    <div
      ref={drop}
      className="h-full border-4 border-dashed border-blue-500 p-4 rounded bg-white"
    >
      <h2 className="font-bold mb-4">Chart Canvas</h2>
      <div className="grid grid-cols-2 gap-4">
        {charts.map((chart) => (
          <ChartCard key={chart.id} chart={chart} />
        ))}
      </div>
    </div>
  );
}

export default ChartCanvas;
