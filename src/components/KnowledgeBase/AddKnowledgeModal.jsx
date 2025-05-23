import React, { useState } from "react";
import useModalStore from "../../store/modalStore";
import { Button, Input, Modal } from "@mantine/core";
import MultiStepper from "../MultiStepper/MultiStepper";

function AddKnowledgeModal() {
  const { closeModal, modals } = useModalStore();
  const [knowledgeName, setKnowledgeName] = useState("");

  return (
    <Modal
      opened={modals.addKnowledgeModal}
      centered
      title={<div className="text-lg font-semibold">Create Knowledge Base</div>}
      onClose={() => closeModal("addKnowledgeModal")}
    >
      <MultiStepper
        showStepper={false}
        customNextButton={(handleNext, loading, isLastStep) => (
          <Button
            onClick={() => {
              if (!knowledgeName.trim()) {
                return;
              }
              handleNext();
            }}
            loading={loading}
          >
            Next
          </Button>
        )}
        steps={[
          {
            label: "Create Knowledge Base",
            content: (
              <div>
                <Input
                  placeholder="Enter Knowledge Name"
                  value={knowledgeName}
                  onChange={(e) => setKnowledgeName(e.target.value)}
                />
              </div>
            ),
          },
          {
            label: "Select a provider",
            content: <div>Select a provider</div>,
          },
        ]}
      />
    </Modal>
  );
}

export default AddKnowledgeModal;
