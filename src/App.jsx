// src/App.jsx
import React, { useState } from "react";
import UploadPanel from "./components/UploadPanel";
import FieldsPanel from "./components/FieldsPanel";
import ChartCanvas from "./components/ChartCanvas";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const [schema, setSchema] = useState([]);
  const [charts, setCharts] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#f6f8fb] text-gray-800">
        <header className="p-4 bg-white shadow-md sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Analytics 360</h1>
        </header>

        <div className="grid grid-cols-12 gap-4 p-4">
          <aside className="col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <UploadPanel setSchema={setSchema} />
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-md max-h-[70vh] overflow-auto">
              <FieldsPanel schema={schema} />
            </div>
          </aside>

          <main className="col-span-10">
            <ChartCanvas charts={charts} setCharts={setCharts} />
          </main>
        </div>
      </div>
    </DndProvider>
  );
}
