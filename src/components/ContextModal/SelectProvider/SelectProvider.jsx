import { FileInput, Input, Select } from "@mantine/core";
import React, { useState } from "react";
import useKnowledgeBaseStore from "../../../store/knowledgeBaseStore";

function SelectProvider() {
  const {
    selectedProvider,
    setSelectedProvider,
    providerConfigs,
    setProviderConfig,
  } = useKnowledgeBaseStore();
  const [file, setFile] = useState(null);

  const providers = [
    { value: "quip", label: "Quip" },
    { value: "local", label: "Local File" },
  ];

  const handleProviderConfigChange = (field, value) => {
    if (selectedProvider) {
      setProviderConfig(selectedProvider, { [field]: value });
    }
  };

  const currentProviderConfig = selectedProvider
    ? providerConfigs[selectedProvider]
    : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm !text-textDimmedColor">Select a provider</p>
        <Select
          data={providers}
          value={selectedProvider}
          onChange={setSelectedProvider}
          placeholder="Select a provider"
          classNames={{
            Input: "bg-bgCardColor",
            dropdown: "!bg-bgCardColor",
          }}
          clearable
          checkIconPosition="right"
          styles={{
            input: { backgroundColor: "var(--bg-card-color)" },
            dropdown: {
              backgroundColor: "var(--bg-card-color)",
              borderColor: "var(--border-default-color)",
            },
            item: {
              color: "var(--text-default-color)",
              "&[data-selected]": {
                backgroundColor: "var(--bg-card-color)",
                "&:hover": {
                  backgroundColor: "var(--bg-card-color)",
                },
              },
              "&:hover": {
                backgroundColor: "var(--bg-card-color)",
              },
            },
          }}
        />
      </div>
      {selectedProvider === "quip" && currentProviderConfig && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-textDimmedColor">Clone Url</div>
            <Input
              placeholder="Enter the clone url"
              value={currentProviderConfig.cloneUrl}
              onChange={(e) =>
                handleProviderConfigChange("cloneUrl", e.target.value)
              }
              styles={{
                input: { backgroundColor: "var(--bg-card-color)" },
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-sm text-textDimmedColor">
              Personal Access Token
            </div>
            <Input
              placeholder="Enter the personal access token"
              value={currentProviderConfig.personalAccessToken}
              onChange={(e) =>
                handleProviderConfigChange(
                  "personalAccessToken",
                  e.target.value
                )
              }
              type="password"
              styles={{
                input: { backgroundColor: "var(--bg-card-color)" },
              }}
            />
          </div>
        </div>
      )}

      {selectedProvider === "local" && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-textDimmedColor">Files</div>
            <FileInput
              placeholder="Select a file"
              value={file}
              onChange={(e) => setFile(e)}
              clearable
              styles={{
                input: { backgroundColor: "var(--bg-card-color)" },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectProvider;
