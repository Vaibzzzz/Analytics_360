import React from "react";
import ReactECharts from "echarts-for-react";

function ChartViewer({ option }) {
  return (
    <div className="mt-4 border rounded p-4 bg-white shadow">
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
}

export default ChartViewer;
