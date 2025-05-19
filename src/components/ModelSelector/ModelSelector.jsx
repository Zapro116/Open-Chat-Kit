import React from "react";
import { Select } from "@mantine/core";
import useModelStore from "../../store/modelStore";

const ModelSelector = () => {
  const { selectedModel, setSelectedModel } = useModelStore();

  console.log(selectedModel);
  const models = [
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-3.5", label: "GPT-3.5" },
    { value: "claude", label: "Claude" },
  ];

  return (
    <Select
      data={models}
      value={selectedModel}
      onChange={setSelectedModel}
      size="sm"
      color="white"
      className=" rounded"
    />
  );
};

export default ModelSelector;
