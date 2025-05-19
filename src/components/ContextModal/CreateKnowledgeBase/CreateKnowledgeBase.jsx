import React from "react";
import { TextInput } from "@mantine/core";
import useKnowledgeBaseStore from "../../../store/knowledgeBaseStore";

function CreateKnowledgeBase() {
  const { knowledgeBaseName, error, setKnowledgeBaseName, isSubmitting } =
    useKnowledgeBaseStore();

  return (
    <div className="space-y-6">
      <TextInput
        label="Knowledge Base Name"
        placeholder="Enter knowledge base name"
        value={knowledgeBaseName}
        onChange={(e) => setKnowledgeBaseName(e.target.value)}
        required
        loading={isSubmitting}
        styles={{
          input: {
            backgroundColor: "var(--bg-card-color)",
            borderColor: "var(--border-default-color)",
            color: "var(--text-default-color)",
          },
          label: {
            color: "var(--text-default-color)",
          },
        }}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}

export default CreateKnowledgeBase;
