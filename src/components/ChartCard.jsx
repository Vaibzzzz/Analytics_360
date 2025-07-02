import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

function ChartCard({ chart }) {
  if (!chart || !chart.series || !Array.isArray(chart.series) || chart.series.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow text-red-600">
        ⚠️ Invalid chart data. Please check the response.
      </div>
    );
  }

  const [chartType, setChartType] = useState(chart.series[0]?.type || "bar");
  const [option, setOption] = useState({});

  useEffect(() => {
    if (!chart || !chart.series || !chart.series[0]) return;

    const yData = chart.series[0].data || [];
    const xData = chart.xAxis || [];

    let series;

    if (chartType === "pie") {
      series = [{
        type: "pie",
        radius: "50%",
        data: xData.map((x, i) => ({
          name: x,
          value: yData[i] ?? 0,
        })),
      }];
      setOption({
        title: { text: "Pie Chart", left: "center" },
        tooltip: { trigger: "item" },
        series,
      });
    } else {
      series = [{
        type: chartType,
        data: yData,
      }];
      setOption({
        xAxis: { type: "category", data: xData },
        yAxis: { type: "value" },
        tooltip: {},
        series,
      });
    }
  }, [chart, chartType]);

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold capitalize">{chartType} Chart</h2>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
          <option value="scatter">Scatter</option>
        </select>
      </div>
      <ReactEcharts option={option} style={{ height: "300px" }} />
    </div>
  );
}

export default ChartCard;
