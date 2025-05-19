import React from "react";
import { Select } from "@mantine/core";
import useModelStore from "../../store/modelStore";

const ModelSelector = () => {
  const { selectedModel, setSelectedModel } = useModelStore();

  console.log(selectedModel);
  const models = [
    { value: "gpt-4o", label: "GPT-4" },
    { value: "gpt-3.5", label: "GPT-3.5" },
    { value: "claude", label: "Claude" },
  ];

  return (
    <Select
      data={models}
      value={selectedModel}
      onChange={setSelectedModel}
      size="sm"
      styles={{
        input: {
          backgroundColor: "rgb(39 39 42)",
          borderColor: "rgb(63 63 70)",
          color: "rgb(212 212 216)",
          "&:hover": {
            backgroundColor: "rgb(63 63 70)",
          },
        },
        dropdown: {
          backgroundColor: "rgb(39 39 42)",
          borderColor: "rgb(63 63 70)",
        },
        item: {
          color: "rgb(212 212 216)",
          "&[data-selected]": {
            backgroundColor: "rgb(88 28 135)",
            "&:hover": {
              backgroundColor: "rgb(107 33 168)",
            },
          },
          "&:hover": {
            backgroundColor: "rgb(63 63 70)",
          },
        },
      }}
    />
  );
};

export default ModelSelector;
