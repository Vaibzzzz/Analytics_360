function SchemaPanel({ schema }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-semibold mb-2">Fields</h2>
      <ul className="space-y-1 text-sm">
        {schema.map((field) => (
          <li key={field.name} className="p-1 bg-gray-200 rounded">{field.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SchemaPanel;
