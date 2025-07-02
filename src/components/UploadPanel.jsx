
import React from "react";
import axios from "axios";

function UploadPanel({ setSchema }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8000/upload", formData);
      const res = await axios.get("http://localhost:8000/schema");
      console.log("Schema from backend:", res.data);
      setSchema(res.data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold mb-2">Upload CSV</h2>
      <input type="file" accept=".csv" onChange={handleFile} />
    </div>
  );
}

export default UploadPanel;
