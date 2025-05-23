import React from "react";
import { Select } from "@mantine/core";
import useModelStore from "../../store/modelStore";

const ModelSelector = () => {
  const { selectedModel, setSelectedModel } = useModelStore();

  console.log(selectedModel);
  const models = [
    { value: "gpt-4o", label: "GPT-4o" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet" },
  ];

  return (
    <Select
      data={models}
      value={selectedModel}
      onChange={setSelectedModel}
      size="sm"
      className="rounded max-w-[180px] bg-bgCardColor"
      classNames={{
        input: "!bg-bgCardColor focus:!ring-0 focus:!border-borderDefault",
      }}
    />
  );
};

export default ModelSelector;
