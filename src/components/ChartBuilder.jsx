import { useState } from "react";
import axios from "axios";

function ChartBuilder({ schema, setChartData }) {
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");
  const [agg, setAgg] = useState("sum");
  const [type, setType] = useState("bar");

  const handleBuild = async () => {
    const res = await axios.post("http://localhost:8000/chart", {
      xField,
      yField,
      aggregation: agg,
      chartType: type,
      filters: []
    });
    setChartData(res.data);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex space-x-4">
        <select onChange={(e) => setXField(e.target.value)} className="p-2 border rounded">
          <option value="">X Field</option>
          {schema.map((f) => (
            <option key={f.name}>{f.name}</option>
          ))}
        </select>
        <select onChange={(e) => setYField(e.target.value)} className="p-2 border rounded">
          <option value="">Y Field</option>
          {schema.map((f) => (
            <option key={f.name}>{f.name}</option>
          ))}
        </select>
        <select onChange={(e) => setAgg(e.target.value)} className="p-2 border rounded">
          <option value="sum">SUM</option>
          <option value="avg">AVG</option>
          <option value="count">COUNT</option>
        </select>
        <select onChange={(e) => setType(e.target.value)} className="p-2 border rounded">
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
        <button onClick={handleBuild} className="bg-blue-600 text-white px-4 rounded">
          Generate
        </button>
      </div>
    </div>
  );
}

export default ChartBuilder;
