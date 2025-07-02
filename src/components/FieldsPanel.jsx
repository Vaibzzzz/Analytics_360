
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";

function FieldItem({ field }) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.FIELD,
    item: { name: field.name },
  }));

  console.log("Rendering draggable field:", field.name);

  return (
    <div ref={drag} className="p-2 bg-gray-200 rounded cursor-pointer mb-1">
      {field.name}
    </div>
  );
}

function FieldsPanel({ schema }) {
  console.log("FieldsPanel received schema:", schema);

  return (
    <div>
      <h2 className="font-bold mb-2">Fields</h2>
      {schema.map((field) => (
        <FieldItem key={field.name} field={field} />
      ))}
    </div>
  );
}

export default FieldsPanel;
